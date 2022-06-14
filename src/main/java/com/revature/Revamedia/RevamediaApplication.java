/**
 * Author(s): @Everyone
 * Contributor(s):
 * Purpose: Main Driver for Revamedia Application. Starts up spring boot application.
 */
package com.revature.Revamedia;
import com.google.zxing.WriterException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;

@SpringBootApplication(scanBasePackages = "com.revature.Revamedia.beans")
// @ComponentScan(
//         basePackages = {"com.revature.Revamedia.beans"},
//         excludeFilters = {
//                 @ComponentScan.Filter(
//                         type = FilterType.ASSIGNABLE_TYPE,
//                         classes = {S3Service.class, S3Config.class, S3Controller.class})})
public class RevamediaApplication {

        public static void main(String[] args) throws IOException, WriterException {

                ConfigurableApplicationContext context = SpringApplication.run(RevamediaApplication.class, args);

        }
}
