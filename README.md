# FoodBridge 🍲🌉
> *"Bridging the gap between surplus food and hunger."*  
> **Brand Message:** *"Good Food Deserves a Second Chance."*

---

## 🏛️ Academic Information & Institutional Details

- **Institution:** Heritage Institute of Technology, Kolkata
- **Department:** Department of Computer Science & Engineering (IoT & Cyber Security including Blockchain Technology) — *CSE(IoT-CS)*
- **Subject / Laboratory:** Design Thinking and Ideation Lab
- **Academic Year:** 2026
- **Project Title:** FoodBridge Platform

---

## 👥 Project Team Members

| Sl. No. | Student Name | University Roll Number | Department |
|:---:|:---|:---:|:---|
| 1 | **{name}** | {roll} | CSE (IoT-CS) |
| 2 | **{name}** | {roll} | CSE (IoT-CS) |
| 3 | **{name}** | {roll} | CSE (IoT-CS) |
| 4 | **{name}** | {roll} | CSE (IoT-CS) |
| 5 | **Subhradip Adak** | 2563057 | CSE (IoT-CS) |

---

## 📖 Comprehensive Project Description

### 1. Abstract & Background
Every day, colossal quantities of wholesome, edible food are discarded by restaurants, bakeries, event caterers, supermarkets, and households. Simultaneously, local food banks, orphanages, day shelters, and low-income families experience persistent food shortages. 

This paradox exists not because of food scarcity, but due to a critical **shortage of coordination, logistics, and trust**. **FoodBridge** is a social-impact web platform engineered through the **Design Thinking** methodology to eliminate food waste and address urban hunger by connecting surplus food donors with recipient shelters and community pickup volunteers.

---

### 2. The Design Thinking Framework Applied

Through qualitative user interviews, observational surveys, journey mapping, and value proposition canvas modeling, our team identified four core user pain points:

| User Voice / Thought | Identified Pain Point | FoodBridge Design Response |
|:---|:---|:---|
| *"Is the food safe and properly handled?"* | **Food Safety & Hygiene Concerns** | Strict food-safety checklists, allergen declarations, and packaging verification. |
| *"I want to donate, but it must be quick and convenient."* | **Inconvenient Donation Process** | Rapid 2-minute listing form, automated expiry tracking, and distance-based matching. |
| *"Frustrated by lack of central coordination."* | **Fragmented Communication** | Unified digital ecosystem linking donors, shelters, and volunteers. |
| *"Donors cannot arrange transport for local pickup."* | **Logistics & Transport Hassles** | Crowdsourced local community volunteer network with a 5-stage delivery tracker. |

---

### 3. Technical Architecture & Tech Stack

FoodBridge is developed strictly as a modern frontend application using local JSON services and Zustand persistence, requiring no backend or external database for demonstration:

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 & Custom FoodBridge Design System
- **State Management:** Zustand 5 (with `persist` middleware for LocalStorage synchronization)
- **Data Layer:** 7 Relational JSON Datasets (`users.json`, `donations.json`, `requests.json`, `volunteers.json`, `deliveries.json`, `notifications.json`, `impact.json`) accessed via `dataService.ts`
- **Charts:** Recharts
- **Maps:** Leaflet & React-Leaflet with OpenStreetMap
- **Forms & Validation:** React Hook Form + Zod
- **Notifications & Feedback:** Sonner Toast Notifications
- **Icons:** Lucide React

---

### 4. Demo Accounts

Quick 1-click login and role switching is available directly in the UI. For manual authentication:

| Role | Demo Email | Notes |
|:---|:---|:---|
| **Donor** | `donor@foodbridge.demo` | Ananya Foods Restaurant (Salt Lake Sector V) |
| **Recipient** | `recipient@foodbridge.demo` | Hope Foundation Shelter (Bidhannagar) |
| **Volunteer** | `volunteer@foodbridge.demo` | Rohan Das (New Town / Salt Lake Corridor) |

*(Note: Demonstration authentication only; state is managed locally via browser LocalStorage).*

---

*Academic Project developed for the Design Thinking & Ideation Lab (2026), Department of CSE (IoT-CS), Heritage Institute of Technology, Kolkata.*
