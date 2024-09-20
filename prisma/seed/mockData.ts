import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('6d4042cb-9b22-4291-88c5-364499930824', '1Ruben56@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv12345', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('9cbfb233-3d38-441a-98ce-2059b8d14e01', '10Leatha.Fritsch@hotmail.com', 'Emily Davis', 'https://i.imgur.com/YfJQV5z.png?id=12', 'inv12345', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('38df2c20-d59d-4412-bb58-5ea1525190f1', '19Hailee.Hahn@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=21', 'inv09876', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('1a6680d5-1ec5-4319-ba47-b755e8fdd675', '28Leann.King87@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=30', 'inv54321', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('1e266277-0f30-4e4e-9e6f-89f47c8e8503', '37Roderick_Gislason@hotmail.com', 'Emily Davis', 'https://i.imgur.com/YfJQV5z.png?id=39', 'inv12345', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('08e18eff-5b9f-48be-b9e4-319b16e9de84', '46Rosa_Bailey45@gmail.com', 'Emily Davis', 'https://i.imgur.com/YfJQV5z.png?id=48', 'inv67890', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('c4e9118e-29e5-41df-98ec-073bc44d99a7', '64Leopoldo.Rogahn@hotmail.com', 'Mike Jones', 'https://i.imgur.com/YfJQV5z.png?id=66', 'inv54321', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('bd31ed00-3c53-4249-af26-814005dfcea0', '73Raven96@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv54321', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e875de13-bf8f-4001-b787-10d2b9c83292', '82Cynthia43@hotmail.com', 'Chris Brown', 'https://i.imgur.com/YfJQV5z.png?id=84', 'inv11223', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('14918670-778a-4f57-b5a6-75490e9934f9', 'FutureTech Systems', 'https://i.imgur.com/YfJQV5z.png?id=92');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('12e8c2fd-7297-4f9d-803c-0735c3935586', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=95');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('1d9ac345-1bfb-4a83-8b1d-3fdea5a3ca8a', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=98');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('6eee0470-bfe5-4bab-81fe-b3c765d8f90c', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=101');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('71fdafdf-3632-4534-9835-5449d992357b', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=104');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('6bc966e3-e99e-4706-bc6c-7b98ae767991', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=107');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('335f77b6-02a0-4741-b6f3-3601f53a3892', 'Pioneer Robotics', 'https://i.imgur.com/YfJQV5z.png?id=110');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('eb6bcbc9-0094-4c51-bb6c-90a53a8535d7', 'FutureTech Systems', 'https://i.imgur.com/YfJQV5z.png?id=113');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('fa8c2c0d-718f-43e3-9217-35ac5c01fe86', 'Global Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=116');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('c57d3957-b211-4e1a-b14b-3bb995e6c402', 'Global Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=119');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('867a748c-d31c-40d0-88aa-ec05d10629b5', 'Quality Assurance', '38df2c20-d59d-4412-bb58-5ea1525190f1', '6eee0470-bfe5-4bab-81fe-b3c765d8f90c');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('f8c77532-1715-446f-9e34-297672218d09', 'Project Manager', 'e875de13-bf8f-4001-b787-10d2b9c83292', '6bc966e3-e99e-4706-bc6c-7b98ae767991');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('360f7157-99df-4139-b6fd-485220d150c2', 'Support Specialist', '38df2c20-d59d-4412-bb58-5ea1525190f1', 'c57d3957-b211-4e1a-b14b-3bb995e6c402');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('a7b10313-ddb7-43eb-a48f-7fa64714c1dc', 'Support Specialist', '9cbfb233-3d38-441a-98ce-2059b8d14e01', 'fa8c2c0d-718f-43e3-9217-35ac5c01fe86');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('d5aa0401-cebd-4fec-ab48-f5aee2af3969', 'Administrator', '9cbfb233-3d38-441a-98ce-2059b8d14e01', '71fdafdf-3632-4534-9835-5449d992357b');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('4bf43826-1b6b-44c5-9cab-a24a1dbb7321', 'Developer', '08e18eff-5b9f-48be-b9e4-319b16e9de84', 'eb6bcbc9-0094-4c51-bb6c-90a53a8535d7');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('7f621142-a72d-491a-8edf-b348686c8758', 'Quality Assurance', '08e18eff-5b9f-48be-b9e4-319b16e9de84', '12e8c2fd-7297-4f9d-803c-0735c3935586');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('0f56c0e5-921b-44ac-bb0d-9dc157ec932a', 'Quality Assurance', 'e875de13-bf8f-4001-b787-10d2b9c83292', '14918670-778a-4f57-b5a6-75490e9934f9');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('003ad9c8-d313-41e0-81ae-f675493370e3', 'Developer', 'bd31ed00-3c53-4249-af26-814005dfcea0', '14918670-778a-4f57-b5a6-75490e9934f9');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('24d1e39f-a9c5-4430-b174-555558505169', 'Quality Assurance', '6d4042cb-9b22-4291-88c5-364499930824', '12e8c2fd-7297-4f9d-803c-0735c3935586');

INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('b38a39eb-c8ff-440f-8d56-4e521915fefa', 'Report Generation', 'Automates the processing of invoices from receipt to payment.', '14918670-778a-4f57-b5a6-75490e9934f9');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('9021d8de-6009-4e8c-ad99-bef88f7813a0', 'Email Notification', 'Generates reports based on specified criteria.', 'fa8c2c0d-718f-43e3-9217-35ac5c01fe86');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('880d3582-b9e8-4ebf-ac13-b1fcc006bfd2', 'Email Notification', 'Transfers data from one system to another efficiently.', 'fa8c2c0d-718f-43e3-9217-35ac5c01fe86');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('85693b57-264d-42bd-9f91-b7d1b06a13b8', 'Customer Onboarding', 'Automates the processing of invoices from receipt to payment.', 'eb6bcbc9-0094-4c51-bb6c-90a53a8535d7');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('fae0858e-89ed-4210-91a3-2e74288219aa', 'Email Notification', 'Sends automated email notifications based on triggers.', '14918670-778a-4f57-b5a6-75490e9934f9');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('5f9265fb-e678-4ae9-88f8-e0f0f21a46f0', 'Email Notification', 'Streamlines the onboarding process for new customers.', 'fa8c2c0d-718f-43e3-9217-35ac5c01fe86');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('70d82a5f-2e82-4abc-a119-d0db639894b1', 'Customer Onboarding', 'Transfers data from one system to another efficiently.', 'fa8c2c0d-718f-43e3-9217-35ac5c01fe86');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('fd64ab27-eddd-4810-b062-5754c27aedb9', 'Report Generation', 'Sends automated email notifications based on triggers.', '71fdafdf-3632-4534-9835-5449d992357b');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('1c8b4808-1e6a-4f15-aa4c-91b197d3cd91', 'Email Notification', 'Automates the processing of invoices from receipt to payment.', 'eb6bcbc9-0094-4c51-bb6c-90a53a8535d7');
INSERT INTO "Workflow" ("id", "name", "description", "organizationId") VALUES ('a3f47c42-5f87-43cd-a87b-f67b8846e918', 'Customer Onboarding', 'Automates the processing of invoices from receipt to payment.', 'fa8c2c0d-718f-43e3-9217-35ac5c01fe86');

INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('6477bee8-f3b7-4044-9635-05909c21a226', 'Report Generation', 'Extracts data from source systems', 855, '9021d8de-6009-4e8c-ad99-bef88f7813a0');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('ec772103-0b7c-468d-a65e-72dcb8ad3197', 'File Upload', 'Generates reports based on data', 518, '85693b57-264d-42bd-9f91-b7d1b06a13b8');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('9b927e09-a495-47c5-9ef5-e299473df267', 'Report Generation', 'Authenticates user credentials', 206, 'fae0858e-89ed-4210-91a3-2e74288219aa');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('eb378ae8-0359-48bb-bdaf-5ee82443e502', 'Email Notification', 'Sends email notifications to users', 705, 'a3f47c42-5f87-43cd-a87b-f67b8846e918');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('a1dd071e-cef1-4f69-a28b-f2bd81f592f7', 'User Authentication', 'Authenticates user credentials', 863, '85693b57-264d-42bd-9f91-b7d1b06a13b8');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('31959042-3bd1-46f0-982c-ff9fe8943c99', 'Email Notification', 'Uploads files to the server', 925, 'a3f47c42-5f87-43cd-a87b-f67b8846e918');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('0909f923-b78b-4ee8-a06e-68b9d0ff8303', 'File Upload', 'Sends email notifications to users', 678, 'b38a39eb-c8ff-440f-8d56-4e521915fefa');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('12b87d81-3695-4a60-9d9a-b491aabfca3c', 'Report Generation', 'Authenticates user credentials', 7, 'fae0858e-89ed-4210-91a3-2e74288219aa');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('041a1a24-10a8-4eb0-ad85-19d548bbcc38', 'Data Extraction', 'Uploads files to the server', 668, '5f9265fb-e678-4ae9-88f8-e0f0f21a46f0');
INSERT INTO "WorkflowStep" ("id", "name", "description", "order", "workflowId") VALUES ('534754c6-8f25-416a-bb49-ec3a8ea0b2dd', 'User Authentication', 'Extracts data from source systems', 614, 'fd64ab27-eddd-4810-b062-5754c27aedb9');

INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('7bda1370-397d-4a7e-a072-ae38f955bd8e', 'Completed', '2025-07-24T06:38:00.718Z', '2025-08-07T14:12:51.192Z', '1c8b4808-1e6a-4f15-aa4c-91b197d3cd91', 'e875de13-bf8f-4001-b787-10d2b9c83292');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('3a64fb71-abb5-4893-a3fd-9eb906ed1447', 'Failed', '2024-01-24T08:16:43.063Z', '2024-03-29T06:27:18.901Z', '9021d8de-6009-4e8c-ad99-bef88f7813a0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('845dde7b-bf76-4d05-a95f-b01ae7cf9be6', 'Pending', '2025-03-05T15:15:49.296Z', '2023-10-13T16:26:00.944Z', 'b38a39eb-c8ff-440f-8d56-4e521915fefa', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('7717e5d2-0872-4787-9d5e-161e0e8a50c8', 'Cancelled', '2024-01-03T06:36:49.705Z', '2025-04-09T06:21:02.387Z', 'b38a39eb-c8ff-440f-8d56-4e521915fefa', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('fd3737c4-6d73-47d6-99a7-11dca6ad0af1', 'Failed', '2023-12-27T13:56:37.114Z', '2023-09-28T19:05:52.229Z', '85693b57-264d-42bd-9f91-b7d1b06a13b8', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('6866544c-aa98-4623-a5e0-42f7a9b44bdd', 'In Progress', '2025-09-09T18:44:40.695Z', '2025-08-21T14:48:19.652Z', 'b38a39eb-c8ff-440f-8d56-4e521915fefa', '08e18eff-5b9f-48be-b9e4-319b16e9de84');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('47d2e5eb-ce6c-4e91-a81d-9f703b40163a', 'Completed', '2025-02-09T20:10:59.024Z', '2024-03-20T09:16:28.542Z', '1c8b4808-1e6a-4f15-aa4c-91b197d3cd91', '6d4042cb-9b22-4291-88c5-364499930824');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('78c810d0-7c72-432b-9595-360b03970265', 'Pending', '2024-11-30T04:04:00.698Z', '2024-04-18T16:16:58.983Z', '1c8b4808-1e6a-4f15-aa4c-91b197d3cd91', '38df2c20-d59d-4412-bb58-5ea1525190f1');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('6c53196e-8ec2-4497-970d-20e351fd4f7a', 'Failed', '2024-08-16T19:50:42.547Z', '2024-10-23T11:43:55.577Z', '880d3582-b9e8-4ebf-ac13-b1fcc006bfd2', '1a6680d5-1ec5-4319-ba47-b755e8fdd675');
INSERT INTO "WorkflowExecution" ("id", "status", "startedAt", "completedAt", "workflowId", "userId") VALUES ('a3549c1c-6538-479d-a4fb-5db1a4f13b21', 'Completed', '2023-11-26T13:43:15.106Z', '2024-03-09T23:02:15.645Z', '5f9265fb-e678-4ae9-88f8-e0f0f21a46f0', '1a6680d5-1ec5-4319-ba47-b755e8fdd675');

INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('ee6d2ae5-94ed-4a95-9ca3-d321b8148ed2', 'ReportBot', 'API', 'dbmysqluseradmin', '1d9ac345-1bfb-4a83-8b1d-3fdea5a3ca8a');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('ec88d739-feaa-46fa-90b3-c2120b2a9a0a', 'ReportBot', 'File', 'smtpsmtp.mail.comport587', '71fdafdf-3632-4534-9835-5449d992357b');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('54f6f7c5-611a-4754-b155-4832fba589a3', 'ReportBot', 'API', 'dbmysqluseradmin', 'c57d3957-b211-4e1a-b14b-3bb995e6c402');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('ade8e6ab-8ade-4c93-b2fa-4f9a57dd1b12', 'AutoMailer', 'File', 'retry3timeout30', '335f77b6-02a0-4741-b6f3-3601f53a3892');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('a0e2e776-a5ff-46a9-ba87-f2e83ca6882d', 'DataSync', 'File', 'endpointapiv1data', '14918670-778a-4f57-b5a6-75490e9934f9');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('08d64453-06d0-45d1-8e11-50f5a4882067', 'InvoiceGen', 'File', 'smtpsmtp.mail.comport587', '6bc966e3-e99e-4706-bc6c-7b98ae767991');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('21f8e22c-d185-48bf-9d7e-1ca363181ac2', 'ReportBot', 'Webhook', 'endpointapiv1data', '6bc966e3-e99e-4706-bc6c-7b98ae767991');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('a722de23-69b7-48b1-80fb-0b4377b1f8b5', 'DataSync', 'Webhook', 'dbmysqluseradmin', '6bc966e3-e99e-4706-bc6c-7b98ae767991');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('7f2073f1-a16e-4e22-9c28-8c1ff4046103', 'InvoiceGen', 'File', 'endpointapiv1data', '6eee0470-bfe5-4bab-81fe-b3c765d8f90c');
INSERT INTO "Integration" ("id", "name", "type", "config", "organizationId") VALUES ('eaae2eed-80a0-44af-b5cf-c7fa448b2a71', 'DataSync', 'Webhook', 'smtpsmtp.mail.comport587', '6bc966e3-e99e-4706-bc6c-7b98ae767991');

INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('6e06eb46-e93c-4ded-a218-04ad768f9f9a', 'm1n2b3v4c5x6z7a8s9d0', 'BetaAccess', '2025-06-11T23:55:47.404Z', '6d4042cb-9b22-4291-88c5-364499930824', 'eb6bcbc9-0094-4c51-bb6c-90a53a8535d7');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('1b2d9f1b-7e22-463c-8c70-87ec99823226', 'm1n2b3v4c5x6z7a8s9d0', 'DeltaCredential', '2025-07-02T09:13:58.276Z', '9cbfb233-3d38-441a-98ce-2059b8d14e01', 'fa8c2c0d-718f-43e3-9217-35ac5c01fe86');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('f7bde7b9-3eca-4920-8d27-820e00a15b6a', 'm1n2b3v4c5x6z7a8s9d0', 'EpsilonSecret', '2024-03-26T05:11:38.442Z', '1a6680d5-1ec5-4319-ba47-b755e8fdd675', '335f77b6-02a0-4741-b6f3-3601f53a3892');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('21df5673-5e71-4e08-9e6a-3ec8a81aac53', 'm1n2b3v4c5x6z7a8s9d0', 'GammaToken', '2025-07-19T02:00:40.618Z', 'bd31ed00-3c53-4249-af26-814005dfcea0', '71fdafdf-3632-4534-9835-5449d992357b');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('5b0aa82b-76c5-4e88-827e-40ad495fc352', 'm1n2b3v4c5x6z7a8s9d0', 'BetaAccess', '2025-03-02T11:05:41.846Z', 'e875de13-bf8f-4001-b787-10d2b9c83292', '71fdafdf-3632-4534-9835-5449d992357b');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('b798b9b4-6e05-410f-86d7-1c8508b2dc98', 'k9j8h7g6f5d4s3a2q1w0', 'DeltaCredential', '2024-02-15T08:29:28.694Z', '6d4042cb-9b22-4291-88c5-364499930824', '71fdafdf-3632-4534-9835-5449d992357b');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('c5d22c5b-56b3-4d13-ac90-bc829490185e', 'a1b2c3d4e5f6g7h8i9j0', 'AlphaKey', '2023-10-28T04:07:37.770Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'fa8c2c0d-718f-43e3-9217-35ac5c01fe86');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('c1ce992e-0a61-4fca-871a-d9bc128c6049', 'p0o9i8u7y6t5r4e3w2q1', 'GammaToken', '2024-07-24T21:53:21.432Z', 'bd31ed00-3c53-4249-af26-814005dfcea0', '6eee0470-bfe5-4bab-81fe-b3c765d8f90c');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('cf74f790-7659-4c1f-9579-8f42d484754c', 'm1n2b3v4c5x6z7a8s9d0', 'BetaAccess', '2024-03-29T02:08:42.223Z', 'e875de13-bf8f-4001-b787-10d2b9c83292', '1d9ac345-1bfb-4a83-8b1d-3fdea5a3ca8a');
INSERT INTO "ApiKey" ("id", "key", "name", "expiresAt", "userId", "organizationId") VALUES ('ed8cd71d-d41b-413a-8549-a42351efa09f', 'p0o9i8u7y6t5r4e3w2q1', 'EpsilonSecret', '2025-02-18T18:28:44.849Z', '9cbfb233-3d38-441a-98ce-2059b8d14e01', '71fdafdf-3632-4534-9835-5449d992357b');

INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('19a311e6-f76f-4f49-a9eb-01d59d83ff54', 'Ultimate', 'Cancelled', '2024-07-24T06:49:47.515Z', '2025-05-05T16:02:30.857Z', '335f77b6-02a0-4741-b6f3-3601f53a3892');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('a6ff02f9-a7a5-479b-a45e-8d050b600050', 'Ultimate', 'Inactive', '2024-07-26T14:56:16.377Z', '2024-04-13T23:46:34.244Z', '71fdafdf-3632-4534-9835-5449d992357b');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('20bb0169-55bb-4728-a150-6375391215f6', 'Enterprise', 'Active', '2023-12-01T22:18:18.110Z', '2024-01-25T20:12:28.321Z', '6eee0470-bfe5-4bab-81fe-b3c765d8f90c');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('c3d3e278-abdc-4eed-88de-ca52959b7348', 'Starter', 'Expired', '2023-09-23T01:31:02.270Z', '2025-01-31T11:37:18.504Z', '12e8c2fd-7297-4f9d-803c-0735c3935586');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('5a0a28b4-efc8-4ba0-a44f-962fc18c410f', 'Ultimate', 'Cancelled', '2025-02-02T11:39:06.268Z', '2024-05-08T22:11:46.764Z', '14918670-778a-4f57-b5a6-75490e9934f9');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('21fc434b-b056-484a-be09-0a0218a98f53', 'Enterprise', 'Inactive', '2024-12-08T21:38:27.469Z', '2024-01-16T10:22:43.243Z', '6eee0470-bfe5-4bab-81fe-b3c765d8f90c');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('2c14bb2b-c03c-46b6-94e3-f80281988d4f', 'Starter', 'Active', '2025-06-05T00:29:52.421Z', '2024-06-29T10:07:38.198Z', '335f77b6-02a0-4741-b6f3-3601f53a3892');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('68f78870-93c1-4bc9-9e1d-eca50644c89f', 'Starter', 'Cancelled', '2023-12-25T12:24:57.135Z', '2024-10-01T00:18:32.566Z', '6eee0470-bfe5-4bab-81fe-b3c765d8f90c');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('92508ed5-2007-4270-a4b2-e309dff7252c', 'Enterprise', 'Inactive', '2025-06-06T10:52:59.338Z', '2024-04-25T14:45:57.660Z', '335f77b6-02a0-4741-b6f3-3601f53a3892');
INSERT INTO "Subscription" ("id", "planName", "status", "startDate", "endDate", "organizationId") VALUES ('c7ee1bdc-bbce-4f8b-9ed6-dd19deab0805', 'Starter', 'Pending', '2024-10-03T03:37:14.519Z', '2025-07-31T01:21:12.147Z', 'eb6bcbc9-0094-4c51-bb6c-90a53a8535d7');

INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('7e53ccff-baa6-4861-abf4-fc0fda04ff0d', '49.99', 'JPY', 'failed', '2025-04-06T21:21:31.035Z', '2024-04-17T02:13:37.189Z', '92508ed5-2007-4270-a4b2-e309dff7252c');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('b29b36bb-c2d8-41f3-9627-c41ac4f46acc', '49.99', 'EUR', 'processing', '2024-02-10T21:31:17.576Z', '2025-05-29T12:33:49.770Z', '20bb0169-55bb-4728-a150-6375391215f6');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('14a9be8e-8a45-4c1f-9041-97c837296388', '120.00', 'GBP', 'failed', '2025-03-11T06:53:19.113Z', '2024-01-12T20:49:46.006Z', '19a311e6-f76f-4f49-a9eb-01d59d83ff54');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('5ccdc7ad-c6c9-42eb-abce-c66e83c246bf', '49.99', 'USD', 'pending', '2023-12-19T14:50:13.652Z', '2025-09-14T21:24:01.649Z', 'c3d3e278-abdc-4eed-88de-ca52959b7348');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('be71f72d-bdd9-4085-bd00-8bc02384e094', '200.00', 'JPY', 'pending', '2024-12-30T04:36:39.528Z', '2024-03-25T06:49:03.860Z', 'a6ff02f9-a7a5-479b-a45e-8d050b600050');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('09826c1e-8d5a-4216-90fd-e4d561fea583', '200.00', 'GBP', 'pending', '2025-05-03T12:08:45.341Z', '2024-05-15T02:25:28.218Z', '21fc434b-b056-484a-be09-0a0218a98f53');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('246d9e5b-6667-4e13-b1d6-4193423dbdef', '49.99', 'EUR', 'failed', '2023-12-22T22:48:30.917Z', '2024-01-07T19:18:56.490Z', '68f78870-93c1-4bc9-9e1d-eca50644c89f');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('7068d25b-5a08-4a85-8cc9-f93b90f6e351', '120.00', 'JPY', 'pending', '2024-02-08T12:20:56.272Z', '2024-08-18T07:58:17.287Z', '92508ed5-2007-4270-a4b2-e309dff7252c');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('e8e0b7de-cb0f-4cf2-80df-1b3b848aa529', '75.50', 'AUD', 'failed', '2024-07-04T05:32:13.105Z', '2024-12-26T15:27:39.859Z', 'a6ff02f9-a7a5-479b-a45e-8d050b600050');
INSERT INTO "BillingData" ("id", "amount", "currency", "status", "billingDate", "paidAt", "subscriptionId") VALUES ('29c3b82b-67ed-48b1-95f7-8f627094a035', '200.00', 'USD', 'failed', '2024-08-25T01:13:06.379Z', '2024-01-13T02:10:39.680Z', 'c7ee1bdc-bbce-4f8b-9ed6-dd19deab0805');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
