# 🚀 AWS CI/CD Pipeline — Node.js Application Deployment

> Fully automated CI/CD pipeline that provisions infrastructure, deploys a Node.js app, validates deployment, and performs automatic rollback on failure — triggered by a single Git push.
 <img width="1922" height="1080" alt="final app" src="https://github.com/user-attachments/assets/c75e6d0f-c12d-4645-a364-3727a5bcb26d" />

---

## 🚀 Key Highlights

* End-to-end CI/CD pipeline using **Jenkins + Terraform + Ansible**
* Infrastructure provisioned dynamically using **Infrastructure as Code**
* Fully automated deployment on every Git push
* **Health check validation** ensures deployment success
* **Automatic rollback** on failure — production never stays broken
* Reduced manual deployment effort from ~15 minutes → **<1 minute**

---

## 🏗️ Architecture

```
Developer → GitHub → Jenkins → Terraform → Ansible → EC2 (App)
                                      ↓
                                Health Check
                                      ↓
                             Success / Rollback
```

---

## 🧱 Infrastructure

| Resource        | Purpose                   |
| --------------- | ------------------------- |
| Jenkins EC2     | Runs CI/CD pipeline       |
| App EC2         | Hosts Node.js application |
| Security Groups | Control SSH/HTTP access   |

---

## ⚙️ Tech Stack

* **Jenkins** — Pipeline orchestration
* **Terraform** — Infrastructure provisioning
* **Ansible** — Configuration & deployment
* **AWS EC2 (Ubuntu)** — Compute
* **Node.js** — Application runtime

---

## 📂 Project Structure

```
.
├── ansible/
│   ├── deploy.yml
│   ├── rollback.yml
│   └── inventory.ini
│
├── app/
│   ├── app.js
│   └── package.json
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── Jenkinsfile
└── README.md
```

---

## 🔄 Pipeline Flow

1. **Checkout**

   * Pull latest code from GitHub

2. **Terraform Apply**

   * Provision EC2 instances and security groups

3. **Ansible Setup**

   * Install Node.js, configure system

4. **Deploy Application**

   * Clone repo → install dependencies → start app

5. **Health Check**

   * `curl http://<APP_IP>:3000`

6. **Post Actions**

   * ✅ Success → deployment complete
   * ❌ Failure → trigger rollback

---

## 🔁 Rollback Mechanism

* Triggered automatically on pipeline failure
* Restores last working version using `rollback.yml`
* Ensures zero broken production state

---

## 📸 Proof of Execution

### ✅ Infrastructure Provisioned

* Terraform successfully created EC2 instances

<img width="1917" height="1080" alt="Screenshot (405)" src="https://github.com/user-attachments/assets/f51544d7-6a19-4c9f-9e19-388cad66f33a" />
<img width="1924" height="1080" alt="Screenshot (403)" src="https://github.com/user-attachments/assets/fe9268eb-7c6a-4d68-bd1e-11a4956f9ef0" />
<img width="1926" height="1080" alt="Screenshot (402)" src="https://github.com/user-attachments/assets/60a387d6-61f3-423e-86e8-ede6b92019a5" />
<img width="1926" height="1080" alt="Screenshot (401)" src="https://github.com/user-attachments/assets/81fd012a-c730-4698-933e-9af1f3e3007b" />

### ✅ Pipeline Execution

* Jenkins pipeline runs automatically on Git push
  
<img width="1924" height="1080" alt="Screenshot (408)" src="https://github.com/user-attachments/assets/199e8f25-31f1-4c93-9c92-7ae219f04914" />
<img width="1904" height="1080" alt="Screenshot (419)" src="https://github.com/user-attachments/assets/bd3333d6-f708-4ff2-b658-be58293d6cb9" />
<img width="1922" height="1080" alt="Screenshot (418)" src="https://github.com/user-attachments/assets/6054fcfa-6448-417a-a406-b5b1d4832354" />
<img width="1907" height="1080" alt="Screenshot (417)" src="https://github.com/user-attachments/assets/fc120574-d4c0-4385-86cb-217d635a546f" />
<img width="1921" height="1080" alt="Screenshot (416)" src="https://github.com/user-attachments/assets/7e1b53cb-e031-4e54-bf3c-a8d6285681cf" />
<img width="1916" height="1080" alt="Screenshot (414)" src="https://github.com/user-attachments/assets/68d2e33f-cdfe-4e41-a4cd-f7bc8a312d83" />
<img width="1926" height="1080" alt="Screenshot (413)" src="https://github.com/user-attachments/assets/5853f4cf-c13b-433c-b456-91b8d2ed7fa0" />
<img width="1928" height="1080" alt="Screenshot (412)" src="https://github.com/user-attachments/assets/cf95bfd7-4c28-4204-a377-99b521c99347" />
<img width="1918" height="1080" alt="Screenshot (411)" src="https://github.com/user-attachments/assets/cd63371d-aee0-47a2-87f4-b14de19f4ad9" />

### ✅ Deployment Success

<img width="3840" height="1080" alt="Screenshot (410)" src="https://github.com/user-attachments/assets/6db94067-2ec4-48a7-88ec-0a89ba8d4c9f" />
* Application accessible via public IP

### ❌ Failure + Rollback

<img width="3840" height="1080" alt="Screenshot (420)" src="https://github.com/user-attachments/assets/a1bd8314-01fc-4703-a093-1ef3b3573c56" />
* Intentional failure injected
* Pipeline failed → rollback executed → system restored

---

## 🚀 Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-repo.git
cd your-repo
```

### 2. Provision Infrastructure

```bash
cd terraform
terraform init
terraform apply
```

### 3. Configure Jenkins

* Add credentials:

  * AWS keys
  * EC2 SSH key
  * App server IP

### 4. Create Pipeline

* Use **Jenkinsfile from SCM**

### 5. Trigger Deployment

```bash
git push origin main
```

---

## 🔐 Security

* SSH access restricted via security groups
* AWS credentials stored in Jenkins (not in code)
* `.pem` key never committed
* Least-privilege access enforced

---

## 🛠️ Troubleshooting

**SSH issues**

```bash
ssh -i key.pem ubuntu@<APP_IP>
```

**App not running**

```bash
systemctl status nodeapp
```

**Health check fails**

```bash
curl http://<APP_IP>:3000
```

---

## 🧠 Key Design Decisions

* **Terraform** → reproducible infrastructure
* **Ansible** → idempotent deployments
* **Rollback strategy** → production safety

---

## 🚧 Future Improvements

* Dockerize application
* Add Nginx reverse proxy
* Implement Blue-Green deployment
* Store Terraform state in S3
* Add monitoring (Prometheus/Grafana)

---

## 👤 Author

**Arunesh Dwivedi**
GitHub • LinkedIn • Blog

---
