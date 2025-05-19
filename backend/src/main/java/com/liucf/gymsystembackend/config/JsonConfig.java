package com.liucf.gymsystembackend.config;

/**
 * @author Stargaze
 * @description
 * @createDate 2025/4/10 23:00
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

/**
 * Spring MVC Json 配置
 */
@JsonComponent
public class JsonConfig {

    /**
     * 解决前端 Long 类型精度丢失问题的核心配置
     * 
     * 问题背景：
     *  - Java 的 Long 类型在前端（如 JavaScript）中会因精度限制（Number 最大安全整数为 2^53-1）导致精度丢失。
     *  - 如果后端直接返回 Long 类型，前端接收到的数字可能会被截断或四舍五入，出现数据异常。
     * 
     * 解决方案：
     *  - 将所有 Long 类型（包括 long 基本类型和 Long 包装类）序列化为字符串（String）返回前端。
     *  - 前端拿到的是字符串类型，避免了精度丢失问题，前端如需数值运算可用 BigInt 或字符串处理。
     */
    @Bean
    public ObjectMapper jacksonObjectMapper(Jackson2ObjectMapperBuilder builder) {
        ObjectMapper objectMapper = builder.createXmlMapper(false).build();
        SimpleModule module = new SimpleModule();
        module.addSerializer(Long.class, ToStringSerializer.instance);
        module.addSerializer(Long.TYPE, ToStringSerializer.instance);
        objectMapper.registerModule(module);
        return objectMapper;
    }
}

