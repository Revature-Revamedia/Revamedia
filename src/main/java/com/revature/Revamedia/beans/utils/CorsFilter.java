/**
 * Author(s): @George Henderson
 * Contributor(s): @Jarod Heng @Giorgi Amirajibi
 * Purpose: CorsFilter
 */
package com.revature.Revamedia.beans.utils;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String[] allowedDomains = {"http://localhost:8080", "http://220328p3revamedia-env.eba-mczbwbpi.us-east-1.elasticbeanstalk.com",
                                "http://localhost:4200", "http://220328-revamedia-ui.s3-website-us-east-1.amazonaws.com",
                                "http://revamedia-ui.s3-website-us-west-1.amazonaws.com"};
        Set<String> allowedOrigins = new HashSet<>(Arrays.asList(allowedDomains));

        String originHeader;
        originHeader = request.getHeader("Origin");

        // this header check is to handle some backend requests using the host header (namely password reset)
        if(request.getHeader("Origin") == null){
            originHeader = "http://";
            originHeader += request.getHeader("host");
        }

        if(allowedOrigins.contains(originHeader)) {
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
            response.setHeader("Access-Control-Allow-Origin", originHeader); // Cannot be '*'. If in production we change this to production domain url.
            response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, mode"); // Cannot be '*'. Add additional headers we need here.
            filterChain.doFilter(request, response);
        }
    }
}
