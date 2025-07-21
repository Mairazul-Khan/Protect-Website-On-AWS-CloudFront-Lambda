# 🔐 Password-Protected Website on AWS using CloudFront & Lambda\@Edge

This project demonstrates how to serve a static website hosted on Amazon S3 using **Amazon CloudFront**, while securing it behind a **password protection layer using Lambda\@Edge**.

## 📦 Features

- Host static website on Amazon S3
- Serve content via CloudFront CDN
- Protect access with HTTP Basic Authentication using Lambda\@Edge
- Seamless, secure edge authentication

---

## 🛠️ Tech Stack

- **Amazon S3** – Static Website Hosting
- **Amazon CloudFront** – Global CDN Distribution
- **AWS Lambda\@Edge** – Authentication logic at the edge
- **AWS IAM** – Secure permission management
- **Terraform/CDK/Manual** – Infrastructure provisioning (your choice)

---

## 🔐 Authentication Flow

1. User sends a request to the CloudFront URL
2. CloudFront triggers a **Lambda\@Edge (Viewer Request)** event
3. Lambda checks for **Basic Auth header**
4. If valid → Proceeds to S3 content\
   If invalid → Responds with `401 Unauthorized`

---

## 📁 Project Structure

```
.
├── lambda/
│   └── basic-auth.js        # Lambda@Edge function
├── site/
│   └── index.html           # Your static website
├── cloudfront-distribution.json or terraform/
└── README.md
```

---

## 🧪 Lambda\@Edge Code (basic-auth.js)

```javascript
'use strict';

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    // Define your username and password here
    const USERNAME = 'mkdevops';
    const PASSWORD = 'passmum'; // change this
    const encodedCredentials = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

    // Check for Basic Authentication header
    if (typeof headers.authorization !== 'undefined') {
        const providedCredentials = headers.authorization[0].value.split(' ')[1];
        if (providedCredentials === encodedCredentials) {
            // Continue request processing if credentials match
            return callback(null, request);
        }
    }

    // Return a 401 Unauthorized response if credentials are missing or don't match
    const response = {
        status: '401',
        statusDescription: 'Unauthorized',
        body: 'Unauthorized',
        headers: {
            'www-authenticate': [{ key: 'WWW-Authenticate', value:'Basic' }]
        },
    };
    callback(null, response);
};

---

## 🚀 Deployment Steps

1. **Upload your website to S3**

   - Enable static website hosting

2. **Create CloudFront Distribution**

   - Set S3 bucket as origin
   - Add Lambda\@Edge to **Viewer Request**

3. **Deploy Lambda\@Edge**

   - Region: **us-east-1** (mandatory)
   - Associate with CloudFront Viewer Request trigger

4. **Test the website**

   - Open CloudFront URL → Login popup should appear

---

## 📝 Notes

- Lambda\@Edge must be deployed in `us-east-1`
- Use HTTPS to avoid sending credentials in plain text
- Ideal for low-security, private preview sites or staging environments

---

## 📷 Example



---

## 📄 License

MIT © YourName

