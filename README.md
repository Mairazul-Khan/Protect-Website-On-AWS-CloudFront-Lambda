# Build-a-password-protected-website-using-AWS-CloudFront-Lambda-and-S3
When developing and hosting a static website or web application in AWS using Amazon S3, it’s a standard practice to build development, staging, and production environments. These environments are essential in the software development lifecycle, providing spaces to test the website or application before deploying to production, where live users interact with it.

Prerequisites
A static website hosted in Amazon S3.
An IAM user that is able to access Lambda, S3, and CloudFront.
Configuring the Viewer Request Lambda@Edge
This Lambda@Edge function that we are planning to create will be triggered on the viewer request. Make sure you are in the us-east-1 region. You can only create Lambda@Edge functions in this region.