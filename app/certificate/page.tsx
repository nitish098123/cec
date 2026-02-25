"use client";

import { Form, Input, Button, ConfigProvider, message, Select } from "antd";
import { useCallback } from "react";
import Image from "next/image";

// Certificate data
const certificateData = [
  {
    name: "Ojas",
    email: "ojaspsy@gmail.com",
    number: "9310313544",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/1.jpg"
  },
  {
    name: "G Saqlain Pasha",
    email: "gsaqlainpasha@zoho.com",
    number: "9993864927",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/2.jpg"
  },
  {
    name: "Santhosh MB",
    email: "santhoshmechery@gmail.com",
    number: "9446035457",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/3.jpg"
  },
  {
    name: "Dr. Binod Kumar Verma ",
    email: "drbkverma@gmail.com",
    number: "7903880832",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/4.jpg"
  },
  {
    name: "Murugeshwari ",
    email: "murugeshwarim2004@gmail.com",
    number: "9159400257",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/5.jpg"
  },
  {
    name: "Dr. Khushboo ",
    email: "khushboo030303@gmail.com",
    number: "8808459800",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/6.jpg"
  },
  {
    name: "Deepthika Shree",
    email: "deepthikashree@gmail.com",
    number: "8248620345",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/7.jpg"
  },
  {
    name: "Mohd. Muzafer Khan",
    email: "khn_mzfr@yahoo.co.in",
    number: "9419408588",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/8.jpg"
  },
  {
    name: "Dr. Syed Sajid Husain Kazmi ",
    email: "dr.shkazmi@gmail.com",
    number: "8565001786",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/9.jpg"
  },
  {
    name: "Shahana Parveen P.P",
    email: "shahanapp313@gmail.com",
    number: "8589922661",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/10.jpg"
  },
  {
    name: "Dr. Santwana Mani",
    email: "Santwanamani1705@gmail.com",
    number: "9818489746",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/11.jpg"
  },
  {
    name: "Archie Rathi ",
    email: "duhh.itzz.archie@gmail.com",
    number: "9810970849",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/12.jpg"
  },
  {
    name: "Kiranmala Phijam",
    email: "daisyphijam5@gmail.com",
    number: "7005666560",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/13.jpg"
  },
  {
    name: "Pragati Katoch ",
    email: "Pragatikatoch23@gmail.com",
    number: "8626837917",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/14.jpg"
  },
  {
    name: "Divya Kansal ",
    email: "divyakansal.0303@gmail.com",
    number: "9839226365",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/15.jpg"
  },
  {
    name: "Abhishek Kumar Singh",
    email: "abhisheksingh2412.email@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/02.jpg"
  },
  {
    name: "Anand Kumar Singh",
    email: "anand1994.singh@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/08.jpg"
  },
  {
    name: "Kasireddi Vara Manikanta Vinay Kumar",
    email: "kumarvmvinay@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/27.jpg"
  },
  {
    name: "Milind Siddharth Vinkar",
    email: "msvinkar@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/35.jpg"
  },
  {
    name: "Pranshu Dhingra",
    email: "dhingrap0707@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/48.jpg"
  },
  {
    name: "Vidhi Sinha",
    email: "vidhisinha24@gmail.com",
    number: "7005666560",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/74.jpg"
  },
  {
    name: "Vignesh G",
    email: "vigneshvarma1@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/75.jpg"
  },
  {
    name: "Johar Tariq",
    email: "johartariq@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-14-2022-23/180.jpg"
  },
  {
    name: "Mayank Silori",
    email: "mayank.silori@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-14-2022-23/181.jpg"
  },
  {
    name: "Haridas K",
    email: "kharidas009@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-14-2022-23/182.jpg"
  },
  {
    name: "CH.Ramadevi",
    email: "Rama.kris22m@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-14-2022-23/183.jpg"
  },
  {
    name: "Tauseef Ejaz",
    email: "ejaz.tauseef@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/24.jpg"
  },
  {
    name: "Neha Singh",
    email: "neha1234online@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/25.jpg"
  },
  {
    name: "Revathy Haridass",
    email: "revathy92vanaja@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/26.jpg"
  },
  {
    name: "Abhi Chand",
    email: "chandabhi78@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/27.jpg"
  },
  {
    name: "Debasish Acharya",
    email: "debasish.acharya1234@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/28.jpg"
  },
  {
    name: "Gaurree Verma",
    email: "gaurreeverma@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/29.jpg"
  },
  {
    name: "Hardik Dogra",
    email: "hardikdogra2012@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/30.jpg"
  },
  {
    name: "Mahesh Kumar Sinha",
    email: "mahi.suny@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/01.jpg"
  },
  {
    name: "Santhosh A V",
    email: "ambalesunny123@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/02.jpg"
  },
  {
    name: "Amal Jose",
    email: "amal007jose@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/03.jpg"
  },
  {
    name: "Namrata Choubey",
    email: "namratachoubey97@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/04.jpg"
  },
  {
    name: "Yogesh Kumar Tiwari",
    email: "ytiwari01@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/05.jpg"
  },
  {
    name: "Rakesh Roshan",
    email: "rakeshmani35@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/06.jpg"
  },
  {
    name: "Rahul Das Survase",
    email: "rahuldas11694@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/07.jpg"
  },
  {
    name: "Shreyas G Trivikram",
    email: "shreyas3vkram@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/08.jpg"
  },
  {
    name: "Ponvel Periyur Kumarasamy",
    email: "pkponvel@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/09.jpg"
  },
  {
    name: "Chandravati Gupta",
    email: "chandravatigupta0904@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/10.jpg"
  },
  {
    name: "Mohammed Rizwan Nagauri",
    email: "riz_nagauri@hotmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/11.jpg"
  },
  {
    name: "Tarun kumar Singh",
    email: "tksingh96@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/12.jpg"
  },
  {
    name: "Krishna Balu Adi",
    email: "dgkrishna0810@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/13.jpg"
  },
  {
    name: "Piyush Kumar Jayant",
    email: "piyushjayant4u@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/14.jpg"
  },
  {
    name: "Yashpal Singh Slathia",
    email: "yashpal.slathia@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/15.jpg"
  },
  {
    name: "Harsh Shringi",
    email: "harshs3791@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/16.jpg"
  },
  {
    name: "Madhusudan Maheshwari",
    email: "madhusudanmaheshwari20@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/17.jpg"
  },
  {
    name: "Krishna gole",
    email: "kgkgole02@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/18.jpg"
  },
  {
    name: "Vishad  Chowbey",
    email: "vishad.chowbey@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/19.jpg"
  },
  {
    name: "Priya Ranjan Behera",
    email: "priyaranjan.799@yahoo.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/20.jpg"
  },
  {
    name: "Aditya Sharma",
    email: "adityasharma9352@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/21.jpg"
  },
  {
    name: "Shardendu Singh Butola",
    email: "shardendu.butola7@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/22.jpg"
  },
  {
    name: "Sanket Bhadange",
    email: "sanketnb2404@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/23.jpg"
  },
  {
    name: "Aniket Singh",
    email: "aniketshanjul@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/24.jpg"
  },
  {
    name: "K Nagarpramodh",
    email: "pramodh4u96@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/25.jpg"
  },
  {
    name: "Biswadeep Bhattacharjee",
    email: "biswadeep9987@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/26.jpg"
  },
  {
    name: "Stalin",
    email: "nsbabu.n12@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/27.jpg"
  },
  {
    name: "VINOD M",
    email: "vinodmurugan12@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/28.jpg"
  },
  {
    name: "Dimpee Shroha",
    email: "dimpeeshroha1@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/29.jpg"
  },
  {
    name: "Dheeraj Bagga",
    email: "dheerajbagga@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/30.jpg"
  },
  {
    name: "Puneeth SJ",
    email: "puneeth.sj@hotmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/31.jpg"
  },
  {
    name: "Ankit",
    email: "shendeankit6@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/32.jpg"
  },
  {
    name: "Arnab Das",
    email: "arnab.das1993@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/33.jpg"
  },
  {
    name: "Gouranga Jana",
    email: "gouranga.egra@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/34.jpg"
  },
  {
    name: "Richie Varghese",
    email: "ric-v@outlook.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/35.jpg"
  },
  {
    name: "Krishna Pratap Singh",
    email: "kpsingh1234@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/36.jpg"
  },
  {
    name: "Sheela N",
    email: "jayasheelanarayanan@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/37.jpg"
  },
  {
    name: "JAY PRAKASH DUTTA",
    email: "bapi1.dutta@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/38.jpg"
  },
  {
    name: "Gautam Varadarajan",
    email: "gautam.10791@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/39.jpg"
  },
  {
    name: "Mudit Shrivastava",
    email: "mudit1318@outlook.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/40.jpg"
  },
  {
    name: "Gururaja Kalmanje",
    email: "gkalmanje@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/41.jpg"
  },
  {
    name: "Pritam Kandula",
    email: "pritam.kawr@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/42.jpg"
  },
  {
    name: "siva raja",
    email: "sivarajacr7@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/43.jpg"
  },
  {
    name: "Jayakumar N",
    email: "jayagma032@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/44.jpg"
  },
  {
    name: "Akash",
    email: "akash.ag8246@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/45.jpg"
  },
  {
    name: "HariPrasad N",
    email: "nhprasad@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/46.jpg"
  },
  {
    name: "Kypa Pradeep Reddy",
    email: "deepu462@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/47.jpg"
  },
  {
    name: "JBharath S",
    email: "jayabharathreddys@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/48.jpg"
  },
  {
    name: "Razat Aggarwal",
    email: "razat.javaprogrammer@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/49.jpg"
  },
  {
    name: "Sayan Goswami",
    email: "secretsayan@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/50.jpg"
  },
  {
    name: "Rahul",
    email: "rahulcks1@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/51.jpg"
  },
  {
    name: "Sreedhar Punnamaraju",
    email: "plssreedhar@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/52.jpg"
  },
  {
    name: "Abhijit Borawake",
    email: "abhijit_borawake@outlook.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/53.jpg"
  },
  {
    name: "CHINNIAH",
    email: "chinniah89@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/54.jpg"
  },
  {
    name: "kedarnath",
    email: "kedarnag@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/55.jpg"
  },
  {
    name: "Manickam C",
    email: "manickamchidhambaram@live.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/56.jpg"
  },
  {
    name: "Manjunath",
    email: "mryavanakiworkspace@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/57.jpg"
  },
  {
    name: "Srinivasan Panneerselvam",
    email: "svas258@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/58.jpg"
  },
  {
    name: "Santosh Kumar Mohanty",
    email: "santa.jyp@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/59.jpg"
  },
  {
    name: "Vijayanand Ravi",
    email: "vijayanandr2000@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/60.jpg"
  },
  {
    name: "Keerthy M",
    email: "keerthikasargunam@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/61.jpg"
  },
  {
    name: "Manish",
    email: "manishkyadava7@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/62.jpg"
  },
  {
    name: "Siddharth Arwade",
    email: "siddhartharwade@live.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/63.jpg"
  },
  {
    name: "Harmeet Talreja",
    email: "bhatia.harmeet11@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/64.jpg"
  },
  {
    name: "prasad",
    email: "varaprasad.motamarri212@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/65.jpg"
  },
  {
    name: "Naga Sri Sai Chaitanya Kolluri",
    email: "saichaitanya518@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/66.jpg"
  },
  {
    name: "Raushan Kumar Singh",
    email: "mailtoraushanpratap@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/67.jpg"
  },
  {
    name: "Sreemol M",
    email: "sreemolgagarinsera@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/68.jpg"
  },
  {
    name: "Harman Singh Kapoor",
    email: "harmansinghkapoor21@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/69.jpg"
  },
  {
    name: "Roohitth Upadhyayuula",
    email: "roohitth.upadhyayuula@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/70.jpg"
  },
  {
    name: "Sivaram",
    email: "sivaveluri15@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/71.jpg"
  },
  {
    name: "indu sahu",
    email: "indu.sahu19nov@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/72.jpg"
  },
  {
    name: "Kapil Katiyar",
    email: "kapil.bic@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/73.jpg"
  },
  {
    name: "Kunal Singh Deo",
    email: "kuunalsinghdeeo@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/74.jpg"
  },
  {
    name: "Raviteja L",
    email: "lraviteja10@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/75.jpg"
  },
  {
    name: "Manoj SP",
    email: "manojvsp12@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/76.jpg"
  },
  {
    name: "Rajat Mishra",
    email: "rajatmisra421@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/77.jpg"
  },
  {
    name: "Sayantan Das",
    email: "d.sayantan@outlook.in",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/78.jpg"
  },
  {
    name: "Hitesh Jaisinghani",
    email: "hiteshjaisinghani94@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/79.jpg"
  },
  {
    name: "Mohamed Jubair",
    email: "amzubair@live.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/80.jpg"
  },
  {
    name: "Arun Kumar Panda",
    email: "arun.k.panda@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/81.jpg"
  },
  {
    name: "Deepak Sonthalia",
    email: "deepakk.sonthalia@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/82.jpg"
  },
  {
    name: "Saideep Kankarla",
    email: "saideep.kankarla@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/83.jpg"
  },
  {
    name: "Chetna",
    email: "chetnakad@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/84.jpg"
  },
  {
    name: "Tushar Raj",
    email: "tusharrajglobus@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/85.jpg"
  },
  {
    name: "Amol Brahme",
    email: "amolsbrahme@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/86.jpg"
  },
  {
    name: "Bakul Patel",
    email: "bakul.payex@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/87.jpg"
  },
  {
    name: "Mahesh J",
    email: "maghi711@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/88.jpg"
  },
  {
    name: "Sachin kumar",
    email: "sachin.kumar.maheshwarappa@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/89.jpg"
  },
  {
    name: "kumar Advait",
    email: "advaitkr91@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/90.jpg"
  },
  {
    name: "Denny Mathew",
    email: "dennymathew.developer@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/91.jpg"
  },
  {
    name: "Akhilesh Soni",
    email: "akhileshsoni@outlook.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/92.jpg"
  },
  {
    name: "kamal singh",
    email: "kamalsingh246@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/93.jpg"
  },
  {
    name: "Girija",
    email: "gpp99371@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/94.jpg"
  },
  {
    name: "Rahul",
    email: "rahul_rungta2002@yahoo.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/95.jpg"
  },
  {
    name: "Hemant Kumar",
    email: "hemant11102219@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/96.jpg"
  },
  {
    name: "Arunkumar Bandaru",
    email: "kumararun.bandaru@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/97.jpg"
  },
  {
    name: "Gangadhar",
    email: "gangadharucet@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/98.jpg"
  },
  {
    name: "Dastagiri Durgam",
    email: "durgamdastagiri.tech@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/99.jpg"
  },
  {
    name: "Ravindra babu jerripothu",
    email: "ravindra.jerry@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/100.jpg"
  },
  {
    name: "Kazi Arafat",
    email: "arafatkazi2448@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/101.jpg"
  },
  {
    name: "Eshan Akash",
    email: "eshanakash13200@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/102.jpg"
  },
  {
    name: "Sharath M",
    email: "sharathre5751@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/103.jpg"
  },
  {
    name: "ASHUTOSH",
    email: "ashutoshgolwalkar@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/104.jpg"
  },
  {
    name: "Balkaran Chandel",
    email: "chandel0810@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/105.jpg"
  },
  {
    name: "Mohd Jaweed",
    email: "mdjaweed2010@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/106.jpg"
  },
  {
    name: "Priyesh K",
    email: "priyeshkaratha@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/107.jpg"
  },
  {
    name: "Vaishnavi Rani",
    email: "vaaishnavirani@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/108.jpg"
  },
  {
    name: "Aman Jaiswal",
    email: "amanjaiswal159.aj@icloud.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/109.jpg"
  },
  {
    name: "Nikhil Wasnik",
    email: "nikhilkumar.nv80@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/110.jpg"
  },
  {
    name: "Shyam Zarikar",
    email: "shyamzarikar@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/111.jpg"
  },
  {
    name: "Pardeep Chahal",
    email: "pardeepchahal89@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/112.jpg"
  },
  {
    name: "Shri Krishna Prasad S",
    email: "sgkrishna619@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/113.jpg"
  },
  {
    name: "Sanketh P",
    email: "sanketh52@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/114.jpg"
  },
  {
    name: "Ankit Kumar",
    email: "ankit.kr9819@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/115.jpg"
  },
  {
    name: "akhil kv",
    email: "akhilkv356@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/116.jpg"
  },
  {
    name: "Prajwal",
    email: "prajwaltikale@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/117.jpg"
  },
  {
    name: "Kanishka Gupta",
    email: "kanishkgupta13@gmail.com",
    number: " ",
    courseName: "Certificate Program in Advanced AI Engineering",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-11-2025-26/118.jpg"
  },
  {
    name: "Aadil Bashaa",
    email: "bashaaadil11@gmail.com",
    number: "7010458534",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/01.jpg"
  },
  {
    name: "Abha Patil",
    email: "abhapatil1724@gmail.com",
    number: "9819465774",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/02.jpg"
  },
  {
    name: "Adwaita Buch",
    email: "adwaitabuch@gmail.com",
    number: "9824228136",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/03.jpg"
  },
  {
    name: "Agalya J",
    email: "agalya3132@gmail.com",
    number: "9071047361",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/04.jpg"
  },
  {
    name: "Aindrila Roy",
    email: "royaindrila221@gmail.com",
    number: "8910356117",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/05.jpg"
  },
  {
    name: "Amit Saini ",
    email: "amit82saini2003@gmail.com",
    number: "9719152975",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/06.jpg"
  },
  {
    name: "Angel John",
    email: "angel.john1983@gmail.com",
    number: "85275 31505",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/07.jpg"
  },
  {
    name: "Anisha Singh",
    email: "anisha0124singh@gmail.com",
    number: "9983001006",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/08.jpg"
  },
  {
    name: "Anjali Saini",
    email: "advanjalisaini24@gmail.com",
    number: "8860840207",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/09.jpg"
  },
  {
    name: "Annie Sharma",
    email: "sharmaannie11@gmail.com",
    number: "8860154883",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/10.jpg"
  },
  {
    name: "Arvind Chidambaram",
    email: "arvind95817@gmail.com",
    number: "9080767277",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/11.jpg"
  },
  {
    name: "Aryan Raj",
    email: "aryaraj8847@gmail.com",
    number: "9990360827",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/12.jpg"
  },
  {
    name: "Bharathi Kannamma V",
    email: "bharathikannamma22594@gmail.com",
    number: "9600225940",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/13.jpg"
  },
  {
    name: "Charvi Madaan",
    email: "madaan.c6172@gmail.com",
    number: "9034421093",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/14.jpg"
  },
  {
    name: "Dahlia Das",
    email: "dahlia.tdas@gmail.com",
    number: "9985815222",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/15.jpg"
  },
  {
    name: "Deepa Saran",
    email: "deepasaran2806@gmail.com",
    number: "9823142552",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/16.jpg"
  },
  {
    name: "Harisha Danny",
    email: "harishadanny23@gmail.com",
    number: "8247855669",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/17.jpg"
  },
  {
    name: "Harshita Saini",
    email: "Ft70041harshitasaini@gmail.com",
    number: "8827236444",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/18.jpg"
  },
  {
    name: "Himanshu Bhagwanani",
    email: "himanshubhagwanai96@gmail.com",
    number: "96198 23322",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/19.jpg"
  },
  {
    name: "Jaya Vyas",
    email: "jayapurohitvyas23@gmail.com",
    number: "8779387707",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/20.jpg"
  },
  {
    name: "Manasi Singh",
    email: "manasibsingh@gmail.com",
    number: "9702116200",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/21.jpg"
  },
  {
    name: "Medha Tyagi",
    email: "tyagimedha11@gmail.com",
    number: "9724240151",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/22.jpg"
  },
  {
    name: "Mickey Doshi",
    email: "doshi.mickey@gmail.com",
    number: "8898558161",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/23.jpg"
  },
  {
    name: "Mihir Soni",
    email: "mihirsoni077@gmail.com",
    number: "8291515896",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/24.jpg"
  },
  {
    name: "Mitali Bane",
    email: "mitalibane180303@gmail.com",
    number: "9987109820",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/25.jpg"
  },
  {
    name: "Mukesh Kumar Mandal",
    email: "krmukesh773@gmail.com",
    number: "6204484760",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/26.jpg"
  },
  {
    name: "Muni Mukesh Kumar",
    email: "mukesh.m10120@gmail.com",
    number: "8056423633",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/27.jpg"
  },
  {
    name: "Namrata Gamare",
    email: "namrata.gamare733@gmail.com",
    number: "9137286200",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/28.jpg"
  },
  {
    name: "Nandhini G",
    email: "nandhinig295@gmail.com",
    number: "9080994139",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/29.jpg"
  },
  {
    name: "Nauka Naik",
    email: "nauka097@gmail.com",
    number: "9825639922",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/30.jpg"
  },
  {
    name: "Neha Gupta",
    email: "hineha2016@gmail.com",
    number: "9958614964",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/31.jpg"
  },
  {
    name: "Nikitta Nataraj",
    email: "nikittanataraj@gmail.com",
    number: "8838441920",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/32.jpg"
  },
  {
    name: "Oishy Chatterjee",
    email: "oishyc03@gmail.com",
    number: "9654413944",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/33.jpg"
  },
  {
    name: "Pallavi Kumari",
    email: "pallavikri708@gmail.com",
    number: "7061592896",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/34.jpg"
  },
  {
    name: "Parul Gupta",
    email: "guccigupta1215@gmail.com",
    number: "9679336888",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/35.jpg"
  },
  {
    name: "Prabha M",
    email: "prabha.m1995@gmail.com",
    number: "9789065457",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/36.jpg"
  },
  {
    name: "Pragati Bane",
    email: "pragatibane06@gmail.com",
    number: "8850664461",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/37.jpg"
  },
  {
    name: "Pragya Pandey",
    email: "iamppragya@gmail.com",
    number: "8085644898",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/38.jpg"
  },
  {
    name: "Pranavi Saini",
    email: "Pranavi.saini11@gmail.com",
    number: "8449079530",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/39.jpg"
  },
  {
    name: "Prashant Mani Tripathi",
    email: "prashantbatun72@yahoo.co.in",
    number: "9098463337",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/40.jpg"
  },
  {
    name: "Preeti Anand",
    email: "preeti_angra@yahoo.com",
    number: "9717420606",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/41.jpg"
  },
  {
    name: "Preeti Jiandani ",
    email: "jiandanipreeti56@gmail.com",
    number: "9870745451",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/42.jpg"
  },
  {
    name: "Prerana Jha",
    email: "preranajha002018@gmail.com",
    number: "8240014632",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/43.jpg"
  },
  {
    name: "Priyanka Mukherjee",
    email: "emailpriyankamukherjee@gmail.com",
    number: "9036912587",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/44.jpg"
  },
  {
    name: "Priyanka Jagtap",
    email: "priyanka.vjag@gmail.com",
    number: "6355406417",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/45.jpg"
  },
  {
    name: "Priyanka Sen",
    email: "priyanka.sen20@gmail.com",
    number: "8802003366",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/46.jpg"
  },
  {
    name: "Rajashree Parida",
    email: "rajashree.hrd@gmail.com",
    number: "8073431088",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/47.jpg"
  },
  {
    name: "Rhythima Banerjee ",
    email: "Rhythima.banerjee@gmail.com",
    number: "9987357120",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/48.jpg"
  },
  {
    name: "Ritu Kumari",
    email: "ritu.khandka@gmail.com",
    number: "9899755640",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/49.jpg"
  },
  {
    name: "Sharon Pinto",
    email: "pintosharon04@gmail.com",
    number: "7022008523",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/50.jpg"
  },
  {
    name: "Shivya Srivastava",
    email: "shivya.shivya94@gmail.com",
    number: "7572084600",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/51.jpg"
  },
  {
    name: "Shradha Khedkar",
    email: "shradhakk99@gmail.com",
    number: "9923968520",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/52.jpg"
  },
  {
    name: "Sonali Bindiya",
    email: "sonali17bindiya@gmail.com",
    number: "8447880983",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/53.jpg"
  },
  {
    name: "Srabanti Roy",
    email: "rsrabanti24@gmail.com",
    number: "8942804241",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/54.jpg"
  },
  {
    name: "Suha Subramanian",
    email: "suhasubramanian@gmail.com",
    number: "9962959946",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/55.jpg"
  },
  {
    name: "Sunita Dhama",
    email: "Sunita.dhama@gmail.com",
    number: "",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/56.jpg"
  },
  {
    name: "Tandrita Saha",
    email: "saha.piu95@gmail.com",
    number: "8777250574",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/57.jpg"
  },
  {
    name: "Tanvi Kolte",
    email: "tanvikolte2003@gmail.com",
    number: "",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/58.jpg"
  },
  {
    name: "Thanishka Pulipati",
    email: "pulipatithanishka@gmail.com",
    number: "87121 96342",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/59.jpg"
  },
  {
    name: "Thulasi P R",
    email: "thulasi0710@gmail.com",
    number: "9791784203",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/60.jpg"
  },
  {
    name: "Trisha Rao",
    email: "trisha190405@gmail.com",
    number: "7011519425",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/61.jpg"
  },
  {
    name: "V Haridev",
    email: "hari9047672950@gmail.com",
    number: "9047672950",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/62.jpg"
  },
  {
    name: "Vaishnavi Deomali",
    email: "vdeomali@gmail.com",
    number: "8265090306",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/63.jpg"
  },
  {
    name: "Vidisha",
    email: "vidujain1995@gmail.com",
    number: "9650091392",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/64.jpg"
  },
  {
    name: "Yerva Sriliptha Reddy",
    email: "lipthareddy@gmail.com",
    number: "9515477260",
    courseName: "Certificate Program in Human Resource Management and Analytics",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-08-2025-26/65.jpg"
  },
  {
    name: "Aarti Garje",
    email: "aartigarje7@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/01.jpg"
  },
  {
    name: "Aditi Sharma",
    email: "aditisharma0207@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/02.jpg"
  },
  {
    name: "Akshay Palle",
    email: "palleakshaykumar@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/03.jpg"
  },
  {
    name: "Amal Francis",
    email: "amalfrancis11@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/04.jpg"
  },
  {
    name: "Anindya Pal",
    email: "pal.anindya@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/05.jpg"
  },
  {
    name: "Antonio Schuh",
    email: "antonio.schuh@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/06.jpg"
  },
  {
    name: "Anurag Sharma",
    email: "anuraggcp93@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/07.jpg"
  },
  {
    name: "Anusha Tagirisa",
    email: "anusha.tagirisa@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/08.jpg"
  },
  {
    name: "Anwesha Nanda",
    email: "anweshananda25@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/09.jpg"
  },
  {
    name: "Arunkumar Azhagudurai",
    email: "speaktoarun@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/10.jpg"
  },
  {
    name: "Atul Verma",
    email: "atulkumarverma1980@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/11.jpg"
  },
  {
    name: "Ayush Ramawat",
    email: "ayushramawat29@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/12.jpg"
  },
  {
    name: "Debojyoti Dey",
    email: "deydebojyoti37@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/13.jpg"
  },
  {
    name: "Habin Linu John",
    email: "habinlinujohn@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/14.jpg"
  },
  {
    name: "Harish Venkatram Saripella",
    email: "venkatramharish@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/15.jpg"
  },
  {
    name: "Jagannathan V",
    email: "vjagan1090@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/16.jpg"
  },
  {
    name: "Jones Selva Kumar Lazar",
    email: "joneslazar56@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/17.jpg"
  },
  {
    name: "Kusuma Durga Sai Manikanta Teja Gidijala",
    email: "manikhanta0023@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/18.jpg"
  },
  {
    name: "Lakshmi Ravichandran",
    email: "lakshmi.cse.gct@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/19.jpg"
  },
  {
    name: "Mohit Murthy",
    email: "mmohit098765@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/20.jpg"
  },
  {
    name: "Muralidhar HG",
    email: "muralidharhg@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/21.jpg"
  },
  {
    name: "Navneet Kaur",
    email: "kaur.navi@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/22.jpg"
  },
  {
    name: "Pavitra Kommineni",
    email: "pavitra17.k@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/23.jpg"
  },
  {
    name: "K K Pradeep",
    email: "kkp.hellopm@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/24.jpg"
  },
  {
    name: "Raghavendra Tejo Karthik Poluri",
    email: "tejokarthikp@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/25.jpg"
  },
  {
    name: "Resmi Murali",
    email: "resmimurali81@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/26.jpg"
  },
  {
    name: "Richa Chandra",
    email: "richachandra07@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/27.jpg"
  },
  {
    name: "Sarang Gurao",
    email: "gurao.sarang@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/28.jpg"
  },
  {
    name: "Sarveshwaran B",
    email: "sarveshwaran4@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/29.jpg"
  },
  {
    name: "Sayantani Mukherjee",
    email: "sayantanim2022@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/30.jpg"
  },
  {
    name: "Shantanu Shukla",
    email: "shantanu1990@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/31.jpg"
  },
  {
    name: "Shatorupa Ghosh",
    email: "ms.shatorupa.ghosh@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/32.jpg"
  },
  {
    name: "Shilpy Gupta",
    email: "sgupta22@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/33.jpg"
  },
  {
    name: "Shivangi Malviya",
    email: "smalviya1105@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/34.jpg"
  },
  {
    name: "Siddharth Shrivash",
    email: "siddharthshrivash@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/35.jpg"
  },
  {
    name: "Sriram Sattiraju",
    email: "sriram.sattiraju9@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/36.jpg"
  },
  {
    name: "Surabhi Tripathi",
    email: "surabhitripathi1002@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/37.jpg"
  },
  {
    name: "Suraj Guha",
    email: "surajguha.official@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/38.jpg"
  },
  {
    name: "Suswaram Sridhar",
    email: "suswaramsridhar@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/39.jpg"
  },
  {
    name: "Swapnendu Roy",
    email: "swapnendu.productmgmt@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/40.jpg"
  },
  {
    name: "Venkata Siva Rama Kirti Teja. Manduri",
    email: "tjintouch77@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/41.jpg"
  },
  {
    name: "Tharun Mani Teja Kotha",
    email: "tarun.kotha007@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/42.jpg"
  },
  {
    name: "Venkata Madhava Pavan Kumar Majeti",
    email: "pavan.majeti@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/43.jpg"
  },
  {
    name: "VIGNESH SUNDRAMURTHI",
    email: "vigneshsundar086@gmail.com",
    number: "",
    courseName: "PRODUCT MANAGEMENT ACCELERATOR PROGRAM",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-55-2025-26/44.jpg"
  },
  {
    name: "Abhishek Bharti",
    email: "bharti1988abhi@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/01.jpg"
  },
  {
    name: "Ankur Singh",
    email: "ankursingh@outlook.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/02.jpg"
  },
  {
    name: "Aparna Arvind Waghade",
    email: "aparnawaghade69450@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/03.jpg"
  },
  {
    name: "Arjun I. T",
    email: "arjunit10@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/04.jpg"
  },
  {
    name: "ASHUTOSH SINGH CHAUHAN",
    email: "asc0686@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/05.jpg"
  },
  {
    name: "Darshil Parmar",
    email: "darshil040@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/06.jpg"
  },
  {
    name: "Deva Darshini S D",
    email: "d.darshisd@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/07.jpg"
  },
  {
    name: "Ekta Dhusia",
    email: "ektadhusia@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/08.jpg"
  },
  {
    name: "Gagandeep Kaur Khera",
    email: "kheragagan01@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/09.jpg"
  },
  {
    name: "Ijaz Fazil Syed Ahmed Kabir",
    email: "ijaz0001@e.ntu.edu.sg",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/10.jpg"
  },
  {
    name: "Isha Chawhan",
    email: "ishachawhan33@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/11.jpg"
  },
  {
    name: "Jyoti Chabra",
    email: "jyotichhabra.55@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/12.jpg"
  },
  {
    name: "Kuldeep Saxena",
    email: "kuldeepsaxena3@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/13.jpg"
  },
  {
    name: "KUMUD PANT",
    email: "pant.kumud@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/14.jpg"
  },
  {
    name: "Lalitha Tiwari",
    email: "lalitha.tiwari@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/15.jpg"
  },
  {
    name: "Mohit Walecha",
    email: "mohit.walecha@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/16.jpg"
  },
  {
    name: "Nandhini Ravi",
    email: "nandhuedu2607@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/17.jpg"
  },
  {
    name: "Nimish Kaundal",
    email: "kumar.nimish1318@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/18.jpg"
  },
  {
    name: "Pallavi Mind",
    email: "pallavimind145@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/19.jpg"
  },
  {
    name: "Priyanka Ghosal",
    email: "priyanka.ghosal.182@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/20.jpg"
  },
  {
    name: "Ranjan Garg",
    email: "ranjangarg2012@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/21.jpg"
  },
  {
    name: "Sahil Pahwa",
    email: "connectsahilpahwa@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/22.jpg"
  },
  {
    name: "Santosh Rajus",
    email: "santoshrajus@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/23.jpg"
  },
  {
    name: "Satya Narayana Anil Kumar Kuriseti",
    email: "satyaanil1986@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/24.jpg"
  },
  {
    name: "Satyam Kumar Pathak",
    email: "satyam6395@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/25.jpg"
  },
  {
    name: "Saurabh Bansal",
    email: "saurabhba@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/26.jpg"
  },
  {
    name: "Sayak Saha",
    email: "sayak202105saha@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/27.jpg"
  },
  {
    name: "Shailendra Kumar Suman",
    email: "suman.shailendra@outlook.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/28.jpg"
  },
  {
    name: "Shivendra Singh",
    email: "shivendrasingh.nmims@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/29.jpg"
  },
  {
    name: "Shrayansh Jain",
    email: "shrayansh.j01@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/30.jpg"
  },
  {
    name: "Siddhant Verma",
    email: "siddhantverma.one@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/31.jpg"
  },
  {
    name: "Sonal Sohni",
    email: "sonal.sohni@es10.euroschoolindia.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/32.jpg"
  },
  {
    name: "Soubheek Tewary",
    email: "soubheek@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/33.jpg"
  },
  {
    name: "Soumyadip Bhattacharya",
    email: "soumyadip.b@gsl.in",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/34.jpg"
  },
  {
    name: "Tarasankar Nayak",
    email: "nayaktsbng@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/35.jpg"
  },
  {
    name: "Varun Chopra",
    email: "varunchopra360@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/36.jpg"
  },
  {
    name: "Vineet Chawla",
    email: "chawla.vinu@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/37.jpg"
  },
  {
    name: "Vineet Kumar",
    email: "singhxvineet@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/38.jpg"
  },
  {
    name: "Vinod Nayak",
    email: "vinodknayak10@gmail.com",
    number: "",
    courseName: "Data Science and Machine Learning",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-37-2024-25/39.jpg"
  },
  {
    name: "Abdul Hakeem K",
    email: "abdulaatik20@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/01.jpg"
  },
  {
    name: "Akaash C Jacob",
    email: "akaashcjacob@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/05.jpg"
  },
  {
    name: "Akshai S",
    email: "akshaikannan5@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/06.jpg"
  },
  {
    name: "Amrita Ghatak",
    email: "aniamrita1610@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/07.jpg"
  },
  {
    name: "Ankit Singh",
    email: "CHAUHANANKIT1992@GMAIL.COM",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/10.jpg"
  },
  {
    name: "Athul M S",
    email: "msathul95@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/12.jpg"
  },
  {
    name: "Bhagya Narayanan",
    email: "bhagyanarayanan07@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/13.jpg"
  },
  {
    name: "Bhagyalaxmi Gorakh Panhale",
    email: "bhagyalaxmip@outlook.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/14.jpg"
  },
  {
    name: "Bitan Mukherjee",
    email: "bitanmukherjee10@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/15.jpg"
  },
  {
    name: "Dilish Babu J",
    email: "dilishbabuautomotive@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/16.jpg"
  },
  {
    name: "Divya Radhakrishnan",
    email: "divyarada96@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/18.jpg"
  },
  {
    name: "Hemant Ingle",
    email: "inglehemant426@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/19.jpg"
  },
  {
    name: "J S Vignesh",
    email: "vigneshjshankaran@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/21.jpg"
  },
  {
    name: "Janhavi Do",
    email: "janhavi1693@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/22.jpg"
  },
  {
    name: "Joel Durairaj G",
    email: "joelappelles0@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/24.jpg"
  },
  {
    name: "Jyotsna Gurjar",
    email: "jyotsnagurjar1996@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/25.jpg"
  },
  {
    name: "K Vigneshwaran",
    email: "gawvicky@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/26.jpg"
  },
  {
    name: "Kaushik B Jain",
    email: "kaushikjainb@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/28.jpg"
  },
  {
    name: "Korasika Vinay",
    email: "korasikavinay@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/29.jpg"
  },
  {
    name: "Kunal Singh",
    email: "ksingh.jsr2006@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/31.jpg"
  },
  {
    name: "Maria Elizabeth Baby",
    email: "babymaria92@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/33.jpg"
  },
  {
    name: "Mohankumar T S",
    email: "mkmech32@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/36.jpg"
  },
  {
    name: "Mrittika Sengupta",
    email: "mrittikasengupta8@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/37.jpg"
  },
  {
    name: "Mukul Dev Patra",
    email: "mukuldevpatra@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/38.jpg"
  },
  {
    name: "Nidhi Singh",
    email: "nidhi127@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/42.jpg"
  },
  {
    name: "Nitin Tyagi",
    email: "ntyagi49@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/43.jpg"
  },
  {
    name: "Patnala Deekshith",
    email: "deekshith.patnala597@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/44.jpg"
  },
  {
    name: "Payel Garai",
    email: "payel.garai@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/45.jpg"
  },
  {
    name: "Ponnana Sudheer Kumar",
    email: "sudheer.ponnana@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/46.jpg"
  },
  {
    name: "Pranay Puskuru",
    email: "pranayp83@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/47.jpg"
  },
  {
    name: "Prateek Sharma",
    email: "prateeksharma.6458@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/49.jpg"
  },
  {
    name: "Preeti Kumari",
    email: "kumaripreeti602@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/50.jpg"
  },
  {
    name: "Priyabrata Maity",
    email: "maity.priyab0410@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/52.jpg"
  },
  {
    name: "Rahul Pillai",
    email: "rahul.pillai.bitsh@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/53.jpg"
  },
  {
    name: "Rajasekar S",
    email: "rajasekarsankar29@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/54.jpg"
  },
  {
    name: "Rakesh Tahiliani",
    email: "rakeshtahilianijmc@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/55.jpg"
  },
  {
    name: "Sai Kumar Repala",
    email: "repala.saikumar15@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/56.jpg"
  },
  {
    name: "Sampath Kumar Pasupuleti",
    email: "dezignslot@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/58.jpg"
  },
  {
    name: "Samsanthosh Durairaj",
    email: "d.samsanthosh@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/59.jpg"
  },
  {
    name: "Santosh Kotakonda",
    email: "santoshkotakonda65@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/61.jpg"
  },
  {
    name: "Sapna Kumari Pan",
    email: "sapnakumari16924@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/62.jpg"
  },
  {
    name: "Seema Mangalesh Chavan",
    email: "seemaharsha122@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/63.jpg"
  },
  {
    name: "Sharvari Thakur",
    email: "sharvari212@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/64.jpg"
  },
  {
    name: "Snehal Mahadev Khandalkar",
    email: "snehalkhandalkar123@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/65.jpg"
  },
  {
    name: "Sriram Kamalakannan",
    email: "sriramk86@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/67.jpg"
  },
  {
    name: "Srishti Singh",
    email: "ssingh17397@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/68.jpg"
  },
  {
    name: "Subham Samantaray",
    email: "subhamsamantaray047@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/69.jpg"
  },
  {
    name: "Sunil Nilkanth Sonar",
    email: "sunilsonarn@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/70.jpg"
  },
  {
    name: "Sutanaya Chatterjee",
    email: "csutanaya@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/71.jpg"
  },
  {
    name: "Uddipan Mitra",
    email: "uddi.mitra@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/72.jpg"
  },
  {
    name: "Vanshika Sachdeva",
    email: "vanshika3114@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/73.jpg"
  },
  {
    name: "Vignesh Venkatesh",
    email: "vellaviki@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/76.jpg"
  },
  {
    name: "Vijayalakshmi Sridevy Kirupalani",
    email: "vijje16@gmail.com",
    number: "",
    courseName: "Post Graduate certificate program in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/77.jpg"
  },
  {
    name: "Sam Jacob George",
    email: "sam.jacob.george@outlook.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/01.jpg"
  },
  {
    name: "Abhijeet K Shende ",
    email: "abi.shende09@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/02.jpg"
  },
  {
    name: "Raja Raja Chozhan C",
    email: "crrchozhan@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/03.jpg"
  },
  {
    name: "Subir Sen",
    email: "subirsen786@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/04.jpg"
  },
  {
    name: "Nivisha Sinha ",
    email: "nivishasinha@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/05.jpg"
  },
  {
    name: "Shailessh A Kudale ",
    email: "Kudale101@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/06.jpg"
  },
  {
    name: "Muthukumar Thambiraj",
    email: "muthu4658@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/07.jpg"
  },
  {
    name: "Hridya Mahajan",
    email: "hridya.mahajan@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/08.jpg"
  },
  {
    name: "Manjari Manisha",
    email: "Manjarimanishadas@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/09.jpg"
  },
  {
    name: "Sanjay Rajendralal Shil ",
    email: "sanju.shil@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/10.jpg"
  },
  {
    name: "Kiran Kumar JP ",
    email: "kiran091@yahoo.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/11.jpg"
  },
  {
    name: "Arunachalam R",
    email: "arunachalam14@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/12.jpg"
  },
  {
    name: "RITIKA MISHRA",
    email: "ritika.mishra02@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/13.jpg"
  },
  {
    name: "Shyam Bir Singh ",
    email: "shyambirs086@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/14.jpg"
  },
  {
    name: "N A Sudhakar",
    email: "sumee@naszen.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/15.jpg"
  },
  {
    name: "Virender ",
    email: "Vir000181818@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/16.jpg"
  },
  {
    name: "Vaibhav Kumar",
    email: "Vaibhavtyagi19@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/17.jpg"
  },
  {
    name: "Yogeshwar Chogale",
    email: "chogaley@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/18.jpg"
  },
  {
    name: "Shruti Prabha",
    email: "shrutiprabha97@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/19.jpg"
  },
  {
    name: "Chandra Kumar sen ",
    email: "chandrakumarsen1994@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/20.jpg"
  },
  {
    name: "Soniya Rawat",
    email: "tech.rawat.mech@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/21.jpg"
  },
  {
    name: "Chitra Srivastava ",
    email: "AR.CHITRASRIVASTAVA@GMAIL.COM",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/22.jpg"
  },
  {
    name: "Alok mishra",
    email: "xpertelectrical@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/23.jpg"
  },
  {
    name: "Dharmesh Gohel",
    email: "gohel.dharmesh@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/24.jpg"
  },
  {
    name: "Dakeshkumar Jayantibhai Patel",
    email: "dj_patel31190@yahoo.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/25.jpg"
  },
  {
    name: "Sudhir Vijay Sattigeri",
    email: "Sudhirvs@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/26.jpg"
  },
  {
    name: "Krishti Rudra ",
    email: "rudra.krishti1@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/27.jpg"
  },
  {
    name: "Jeevan Choudhary",
    email: "choudhary.jeevan3@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/28.jpg"
  },
  {
    name: "Suhas Ranjan",
    email: "suhas.ranjan83@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/29.jpg"
  },
  {
    name: "Gayathri A",
    email: "gayathri.ashokan21@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/30.jpg"
  },
  {
    name: "Sagarika Ghosal",
    email: "ghosal25@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/31.jpg"
  },
  {
    name: "Dipansh Jain",
    email: "dipanshjain.noida@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/32.jpg"
  },
  {
    name: "Rajasekaran Vairamani",
    email: "rajasekaranvm@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/33.jpg"
  },
  {
    name: "Prem Kumar",
    email: "prem.kumar@punjabchemicals.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/34.jpg"
  },
  {
    name: "Pravin Thakor ",
    email: "pthakor1984@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/35.jpg"
  },
  {
    name: "Ashish Panwar ",
    email: "ashishpanwar807@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/36.jpg"
  },
  {
    name: "Shreya Sharma",
    email: "shreya11cg@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/37.jpg"
  },
  {
    name: "Sushanta Kishore Tripathy",
    email: "Tripathy79sushanta@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/38.jpg"
  },
  {
    name: "Shivakumar M",
    email: "shivuenv@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/39.jpg"
  },
  {
    name: "Anushka Sahu ",
    email: "anushkasahu980@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/40.jpg"
  },
  {
    name: "Rai Sanket Mahendra",
    email: "sanketrai16@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/41.jpg"
  },
  {
    name: "Ashish Kumar Pandey",
    email: "pandey.ashish@outlook.in",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/42.jpg"
  },
  {
    name: "Kanak Wadhwani",
    email: "kanak.swadhwani@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/43.jpg"
  },
  {
    name: "Saurabh Agarwal",
    email: "Saurabhbe.1971@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/44.jpg"
  },
  {
    name: "Pavan Balasaheb Jadhav",
    email: "pavan.jadhav@rishabh.co.in",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/45.jpg"
  },
  {
    name: "Famida Khan",
    email: "famprzm@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/46.jpg"
  },
  {
    name: "Pawan Yadav",
    email: "pawan.mgp@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/47.jpg"
  },
  {
    name: "Tanmeet Kaur Ahuja",
    email: "ahuja.tanmeet29@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/48.jpg"
  },
  {
    name: "Murali Ravi",
    email: "rmurali364@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/49.jpg"
  },
  {
    name: "Amit Shekhar",
    email: "meetamitshekhar@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/50.jpg"
  },
  {
    name: "Rupesh Sinha",
    email: "rupesh.sinha1@hotmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/51.jpg"
  },
  {
    name: "Yashdeep Shukla",
    email: "Yashdeepshukla89@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/52.jpg"
  },
  {
    name: "Aradhana Mudgala",
    email: "aradhanasharmamudgal@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/53.jpg"
  },
  {
    name: "Nishi Gandha",
    email: "nic_0715@yahoo.co.in",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/54.jpg"
  },
  {
    name: "Muzaffar Ahmad ",
    email: "mamf208@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/55.jpg"
  },
  {
    name: "Puneet Trehan",
    email: "puneet_trehan@yahoo.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/57.jpg"
  },
  {
    name: "Prabuddha Maitreya",
    email: "prabuddha.maitreya@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/59.jpg"
  },
  {
    name: "ADHIKAR GUPTA",
    email: "Adhikargupta@Live.In",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/60.jpg"
  },
  {
    name: "Abhijeet Pratap Lahare",
    email: "abhijeetlahare@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/61.jpg"
  },
  {
    name: "Abir Bhattacharya",
    email: "abirb1@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/62.jpg"
  },
  {
    name: "Afak Ismail Shete",
    email: "afaqueshete@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/63.jpg"
  },
  {
    name: "Ajit Kumar Prusty",
    email: "ajit_prusty2003@yahoo.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/64.jpg"
  },
  {
    name: "Amit Kumar",
    email: "77amitbhatia@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/65.jpg"
  },
  {
    name: "Amit Suresh Badwar",
    email: "amit.badwar@trinityholdings.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/66.jpg"
  },
  {
    name: "Anand",
    email: "pibtls@hckgroup.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/67.jpg"
  },
  {
    name: "Arjun Singh Yadav",
    email: "arjun.singh88@yahoo.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/68.jpg"
  },
  {
    name: "Atharva",
    email: "atharvanivadekar@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/69.jpg"
  },
  {
    name: "Balasaheb Vilas Yadav",
    email: "balasaheb.yadav1987@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/70.jpg"
  },
  {
    name: "Bodalaga Pradeep Kumar",
    email: "pradeepkumar777@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/71.jpg"
  },
  {
    name: "Dama Sohanlal Savjibhai",
    email: "damasohan81@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/72.jpg"
  },
  {
    name: "Deepak Saini",
    email: "consultant.sci.eng@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/73.jpg"
  },
  {
    name: "Devika Santosh Chachad",
    email: "devikachachad23@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/74.jpg"
  },
  {
    name: "Dilip R Patel",
    email: "dilip_patel123@yahoo.co.in",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/75.jpg"
  },
  {
    name: "Dr. Harisadhan Malakar",
    email: "malakarhari@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/76.jpg"
  },
  {
    name: "Dr. Mohammad Sadre Alam Khan",
    email: "sadresenes@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/77.jpg"
  },
  {
    name: "Farzana P A",
    email: "drfarzana.pa@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/78.jpg"
  },
  {
    name: "Manju ",
    email: "manjugill097@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/79.jpg"
  },
  {
    name: "Mantu swain",
    email: "mantu.swain83@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/80.jpg"
  },
  {
    name: "Nilesh Pandey",
    email: "nileshpande0707@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/81.jpg"
  },
  {
    name: "Panneer Selvam",
    email: "p.selvam@elsevier.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/82.jpg"
  },
  {
    name: "Pranav",
    email: "pranavmathan1998@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/83.jpg"
  },
  {
    name: "Prashant Gaikwad",
    email: "prashant.mpcb@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/84.jpg"
  },
  {
    name: "prathamesh prabhakar gurav",
    email: "guravprathamesh799@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/85.jpg"
  },
  {
    name: "Prerna pandey",
    email: "Prerna.pandey10@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/86.jpg"
  },
  {
    name: "Prichay Mehta",
    email: "parichay16@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/87.jpg"
  },
  {
    name: "Rajkumar Rengaraj",
    email: "rajellis.91@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/88.jpg"
  },
  {
    name: "Rupali Lalit Shaiwale",
    email: "rlshaiwale@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/89.jpg"
  },
  {
    name: "Rutuja Adhau",
    email: "rutujaadhau104@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/90.jpg"
  },
  {
    name: "Sammeta Tanya sri",
    email: "tanyasri990@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/91.jpg"
  },
  {
    name: "Samptoor Venu Madhav",
    email: "venusamptoor@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/92.jpg"
  },
  {
    name: "Sanjay Vaman Deogharkar",
    email: "sanjay.deogharkar@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/93.jpg"
  },
  {
    name: "Shailaja Shah",
    email: "shailajaamreliya@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/94.jpg"
  },
  {
    name: "Sharia Durrani",
    email: "sharia.durrani27@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/95.jpg"
  },
  {
    name: "Shirly Thomas",
    email: "shirlythomas.ils@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/96.jpg"
  },
  {
    name: "Shivangi",
    email: "shivangi21415@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/97.jpg"
  },
  {
    name: "Shriyam Saurabh",
    email: "shriyam1551@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/98.jpg"
  },
  {
    name: "Siddhesh",
    email: "siddhesh.adabal@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/99.jpg"
  },
  {
    name: "Subhodeep Das",
    email: "subhodeep7379@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/100.jpg"
  },
  {
    name: "Surendra Kumar Yadaw",
    email: "skyak1986@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/101.jpg"
  },
  {
    name: "Sushma",
    email: "sushmakata112@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/102.jpg"
  },
  {
    name: "Uma rao",
    email: "Umaforever9@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/103.jpg"
  },
  {
    name: "Usman Mehmood",
    email: "usman.m@trinityholdings.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/104.jpg"
  },
  {
    name: "Venkata Krishnakanth Valluru",
    email: "krishnakanth254@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/105.jpg"
  },
  {
    name: "Vibha Rani",
    email: "rvibha07@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/106.jpg"
  },
  {
    name: "Vijay Purohit",
    email: "purohit.vijay@rediffmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/107.jpg"
  },
  {
    name: "Yadu Surya N P",
    email: "npyadu@gmail.com",
    number: "",
    courseName: "Certificate Program in Sustainability, ESG and GRI Standards",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-06-2025-26/108.jpg"
  }
];

// Memoize theme configuration outside component to avoid recreating on every render
const buttonThemeConfig = {
  components: {
    Button: {
      defaultBg: "#FFAE0E",
      defaultHoverBg: "#E5893C",
      defaultHoverColor: "#2C2C2C",
    },
  },
};

// Pre-compute unique course names outside component since certificateData is static
const uniqueCourseNames = Array.from(
  new Set(certificateData.map((cert) => cert.courseName))
).map((courseName) => ({
  value: courseName,
  label: courseName,
}));

export default function CertificatePage() {
  const [form] = Form.useForm();

  const onFinish = useCallback((values: { email: string; courseName?: string; [key: string]: unknown }) => {
    const emailAddress = String(values.email).trim().toLowerCase();
    const selectedCourseName = values.courseName ? String(values.courseName).trim() : "";
    
    // First filter by course name, then find matching certificate by email
    const matchedCertificate = certificateData.find(
      (cert) => 
        cert.courseName === selectedCourseName &&
        String(cert.email).trim().toLowerCase() === emailAddress
    );

    if (matchedCertificate) {
      // Redirect to certificate link
      window.open(matchedCertificate.certificate_links, "_blank");
      message.success("Certificate found! Opening download...");
    } else {
      // Show error message
      message.error("Certificate not found. Please check your course name and email ID.");
    }
  }, []);
  return (
    <div className="w-full">
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/certificate_background.jpeg')] bg-cover bg-center brightness-[0.7]"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative flex items-center z-20">
          <Image
            alt="IITR Logo"
            src="/IITR_logo.png"
            width={164}
            height={164}
            priority
            className=""
          />
          <div className="border-l pl-2 text-white">
            <span className="text-2xl">IIT ROORKEE</span>
            <p className="text-4xl">CEC</p>
            <p className="text-4xl">Certificate</p>
          </div>
        </div>
      </section>
      <section className="bg-[#FFFAF1] pb-6">
        <div className="w-full mb-6">
          <div
            className={`flex-grow pt-6 pb-4 cursor-pointer bg-[#FFE3AC] border-b-4 border-[#FFAE0E]`}
          >
            <h2 className="text-2xl font-medium text-center tracking-wide">
              Download Certificate
            </h2>
          </div>
        </div>
        <div className="p-6 max-w-md mx-auto container">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <Form.Item
              label="Course Name"
              name="courseName"
              rules={[
                { required: true, message: "Please select your course name!" },
              ]}
            >
              <Select
                placeholder="Select your course name"
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={uniqueCourseNames}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Candidate Name"
              name="candidateName"
              rules={[
                { required: true, message: "Please enter your candidate name!" },
              ]}
            >
              <Input placeholder="Enter your candidate name" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item>
              <ConfigProvider theme={buttonThemeConfig}>
                <Button
                  type="default"
                  htmlType="submit"
                  className="border-none w-full py-2.5 px-6 text-black text-lg font-normal tracking-wide"
                >
                  Download Certificate
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
}
