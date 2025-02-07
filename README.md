# Welcome to the ClearStack AI API Docs 🚀

**Resources, libraries, walkthroughs, and more to help you integrate ClearStack AI seamlessly.**  

> By continuing to use or access ClearStack AI's API, you agree to be bound by the terms of our [Developer Agreement](#).

_Last updated: February 2025_

---

## 📖 Table of Contents

1. [Getting Started](#getting-started)
   - [Welcome](#welcome)
   - [Creating a Demo Account](#creating-a-demo-account)
   - [API Keys](#api-keys)
   - [Making Your First Request](#making-your-first-request)
   - [Tiers and Rate Limits](#tiers-and-rate-limits)
   - [Terms of Service](#terms)

2. [ClearStack AI REST API](#rest-api)
   - [Users](#users)
   - [Authentication](#authentication)
   - [Projects](#projects)
   - [Tasks](#tasks)

3. [WebSocket API](#websocket-api)
   - [Real-time Updates](#real-time-updates)
   - [Subscribing to Events](#subscribing-to-events)

---

## 🚀 Getting Started

### Welcome
Welcome to ClearStack AI’s trader and developer documentation. This guide outlines all available functionality, endpoints, and best practices.

**Next Step: [Creating a Demo Account](#creating-a-demo-account)**

---

## 🔑 API Keys

To access the API, you’ll need to generate an API key via your ClearStack AI account.

### Generating an API Key:
1. Log in to your dashboard.
2. Navigate to **Settings → API Keys**.
3. Click **Generate New Key**.

---

## 📬 Making Your First Request

Example using `curl`:
```bash
curl --request GET \
     --url https://api.clearstack.ai/v1/projects \
     --header 'Authorization: Bearer YOUR_API_KEY'
