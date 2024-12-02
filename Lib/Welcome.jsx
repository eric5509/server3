import React from 'react';
import { Html, Body, Container, Text } from '@react-email/components';

const EmailTemplate = ({ name }) => (
  <Html>
    <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", margin: 0, padding: 20 }}>
      <Container style={{ padding: "20px", textAlign: "center", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#333" }}>Welcome, {name}!</h1>
        <Text style={{ margin: "20px 0", fontSize: "16px", color: "#555" }}>
          We're thrilled to have you join us. If you have any questions, feel free to reach out!
        </Text>
        <Text style={{ fontSize: "14px", color: "#777" }}>- The Team</Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;
