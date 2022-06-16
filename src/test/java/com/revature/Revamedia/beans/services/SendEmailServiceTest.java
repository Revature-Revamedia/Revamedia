package com.revature.Revamedia.beans.services;

import com.revature.Revamedia.entities.User;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.internet.MimeMessage;

import static org.mockito.Mockito.*;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SendEmailServiceTest {

    @Mock private JavaMailSender mockJavaMailSender;
    @Mock private UserService mockUserService;
    @Mock private JsonWebToken mockJsonWebToken;

    @InjectMocks
    private SendEmailService sendEmailService;

    @Test
    public void sendEmailSendsEmail() {
        String emailMesesageToSend = "Hello!";

        User userToFind = new User();
        String oldResetToken = "alagoiuopiuqowpieqwe";
        userToFind.setResetPasswordToken(oldResetToken);
        when(mockUserService.existsByEmail(emailMesesageToSend)).thenReturn(true);
        when(mockUserService.findByEmail(emailMesesageToSend)).thenReturn(userToFind);
        when(mockUserService.save(userToFind)).thenReturn(userToFind);

        ResponseEntity<Object> responseFromAct = sendEmailService.sendEmail(emailMesesageToSend);

        assertNotEquals(oldResetToken, userToFind.getResetPasswordToken()); // Changes Reset Token
        verify(mockUserService, times(1)).save(userToFind); // Saves user
        verify(mockJavaMailSender, times(1)).send(any(SimpleMailMessage.class)); // Sends message
        assertEquals(HttpStatus.OK, responseFromAct.getStatusCode()); // Check response
    }

    @Test
    public void sendEmailDoesNotSendEmailWhenUserDoesNotExist() {
        String emailMesesageToSend = "Hello!";

        when(mockUserService.existsByEmail(emailMesesageToSend)).thenReturn(false);

        sendEmailService.sendEmail(emailMesesageToSend);

        verify(mockUserService, times(0)).save(any()); // Saves user
        verify(mockJavaMailSender, times(0)).send(any(MimeMessage.class)); // Sends message
    }
}
