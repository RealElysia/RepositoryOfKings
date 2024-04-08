package com.web;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import com.alibaba.fastjson.*;
import java.util.*;
import java.io.*;

public class Weibo {

    public static List<String> getCat(String url, String id, String cookie) throws IOException{
        // 存储抓取的博主UID和since_id 参数
        HashMap<String, String> fm = new HashMap<>();
        fm.put("since", "0");
        fm.put("id", id);
        // 格式化URL处理
        String finalUrl = url + String.format("?uid=%s&sinceid=%s&has_album=true", fm.get("id"), fm.get("since"));
        // 图片的pid
        List<String> pid = new ArrayList<>();
        // 发送请求
        CloseableHttpClient client = HttpClients.createDefault();

        HttpGet hg = get(finalUrl, cookie);
        CloseableHttpResponse response = client.execute(hg);
        // 解析返回的数据
        if (response.getStatusLine().getStatusCode() == 200){
            String res = EntityUtils.toString(response.getEntity(), "UTF-8");
            JSONObject js = JSON.parseObject(res);
            JSONArray ja = js.getJSONObject("data").getJSONArray("list");
            String since = js.getJSONObject("data").getString("since_id");
            for (int i=0; i<ja.size(); i++){
                JSONObject j = ja.getJSONObject(i);
                String p = j.getString("pid");
                pid.add(p);
            }
            for (int i=0; i<fm.size(); i++){
                fm.replace("since", since);
            }
        }
        client.close();
        response.close();
        return pid;
    }

    public static HttpGet get(String url, String cookie) {
        HttpGet hg = new HttpGet(url);
        hg.setHeader("cookie", cookie);
        return hg;
    }

    public void save(String url, String id, String cookie) throws IOException{
        List<String> res = getCat(url, id, cookie);
        for (String re : res) {
            String pic_url = "https://wx3.sinaimg.cn/mw2000/" + re + ".jpg";
            CloseableHttpClient client = HttpClients.createDefault();
            HttpGet hg = get(pic_url, cookie);
            CloseableHttpResponse response = client.execute(hg);
            // 二进制存储图片
            byte[] b = EntityUtils.toByteArray(response.getEntity());
            Date date = new Date();
            long time = date.getTime();
            OutputStream out = new FileOutputStream("miao/" + "mei_" + time + ".jpg");
            out.write(b);

            out.close();
            client.close();
            response.close();
        }
    }
}
