package com.elysia.controller;

import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.*;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ImageDownload {
    private static final String FOLDER = "/Users/ayaka/Desktop/sakura/blog/miao";
    @GetMapping("/download")
    public ResponseEntity<Resource> download() throws IOException{
        List<File> files = getFiles(FOLDER);
        byte[] zip = createZip(files);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Images.zip\"");
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(zip.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new FileSystemResource(createZipFile(zip)));
    }

    private List<File> getFiles(String path){
        File f = new File(path);
        List<File> files = new ArrayList<>();
        if(f.isDirectory()){
            File[] ff = f.listFiles();
            if (ff != null){
                for (File fl: ff) {
                    if (fl.isFile()){
                        files.add(fl);
                    }
                }
            }
        }
        return files;
    }

    private byte[] createZip(List<File> files) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            for (File file : files) {
                byte[] bytes = Files.readAllBytes(file.toPath());
                ZipEntry zipEntry = new ZipEntry(file.getName());
                zos.putNextEntry(zipEntry);
                zos.write(bytes);
                zos.closeEntry();
            }
        }
        return baos.toByteArray();
    }

    private File createZipFile(byte[] zipBytes) throws IOException {
        File zipFile = File.createTempFile("Images", ".zip");
        zipFile.deleteOnExit();
        FileOutputStream fos = new FileOutputStream(zipFile);
        fos.write(zipBytes);
        fos.close();
        return zipFile;
    }
}
