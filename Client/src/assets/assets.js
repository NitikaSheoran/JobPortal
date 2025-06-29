import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import company_icon from "./company_icon.svg";
import microsoft_logo from "./microsoft_logo.svg";
import walmart_logo from "./walmart_logo.svg";
import accenture_logo from "./accenture_logo.png";
import profile_img from "./profile_img.png";
import app_main_img from "./app_main_img.png";
import cross_icon from './cross_icon.svg';
import location_icon from './location_icon.svg';
import money_icon from './money_icon.svg';
import suitcase_icon from './suitcase_icon.svg';
import person_icon from './person_icon.svg';
import upload_area from './upload_area.svg';
import resume_selected from './resume_selected.svg';
import resume_not_selected from './resume_not_selected.svg';
import play_store from './play_store.svg';
import app_store from './app_store.svg';
import back_arrow_icon from './back_arrow_icon.svg';
import left_arrow_icon from './left_arrow_icon.svg';
import right_arrow_icon from './right_arrow_icon.svg';
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import home_icon from './home_icon.svg'
import add_icon from './add_icon.svg'
import profile_upload_icon from './profile_upload_icon.svg'
import person_tick_icon from './person_tick_icon.svg'
import resume_download_icon from './resume_download_icon.svg'
import delete_icon from './delete_icon.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import samsung_logo from './samsung_logo.png'
import adobe_logo from './adobe_logo.png'
import amazon_logo from './amazon_logo.png'

export const assets = {
    logo,
    search_icon,
    cross_icon,
    upload_area,
    company_icon,
    resume_not_selected,
    resume_selected,
    microsoft_logo,
    walmart_logo,
    accenture_logo,
    app_main_img,
    play_store,
    app_store,
    back_arrow_icon,
    left_arrow_icon,
    right_arrow_icon,
    location_icon,
    money_icon,
    suitcase_icon,
    person_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    home_icon,
    add_icon,
    person_tick_icon,
    resume_download_icon,
    profile_img,
    delete_icon,
    profile_upload_icon,
    email_icon,
    lock_icon,
    samsung_logo,
    adobe_logo,
    amazon_logo
}

export const JobCategories = [
    "Plumber",
    "Carpenter",
    "Construction",
    "Cleaning",
    "Electrician",
    "Loading & Unloading",
    "Painter",
    "Renovation work"
]

export const ShiftOptions = [
  "Morning",
  "Afternoon",
  "Evening",
  "Night",
  "Flexible"
];

export const WageRanges = [
  "Below ₹300",
  "₹300 - ₹500",
  "₹500 - ₹700",
  "₹700 - ₹1000",
  "Above ₹1000"
];

export const DistanceOptions = [
  "Within 1 km",
  "Within 3 km",
  "Within 5 km",
  "Within 10 km",
  "Any distance"
];


export const viewApplicationsPageData = [
  { _id: 1, name: "Sunita Devi", categories: ["Cleaning"], location: "Lajpat Nagar, Delhi", imgSrc: profile_img },
  { _id: 2, name: "Rajesh Kumar", categories: ["Plumber", "Electrician"], location: "Sector 5, Gurugram", imgSrc: profile_img },
  { _id: 3, name: "Pooja Sharma", categories: ["Painter"], location: "Noida", imgSrc: profile_img },
  { _id: 4, name: "Arvind Yadav", categories: ["Construction", "Loading & Unloading"], location: "Faridabad", imgSrc: profile_img },
  { _id: 5, name: "Meena Kumari", categories: ["Renovation work"], location: "Ashok Vihar, Delhi", imgSrc: profile_img },
  { _id: 6, name: "Rohit Singh", categories: ["Carpenter"], location: "Kalkaji, Delhi", imgSrc: profile_img },
  { _id: 7, name: "Seema Rani", categories: ["Cleaning", "Painter"], location: "Sector 22, Noida", imgSrc: profile_img },
];
 

export const jobsApplied = [
  {
    company: "UrbanFix",
    title: "Plumber",
    location: "Sector 5, Gurugram, Haryana",
    date: "22 Aug, 2024",
    status: "Pending",
    logo: company_icon,
  },
  {
    company: "QuickElectric",
    title: "Electrician Helper",
    location: "Connaught Place, Delhi",
    date: "25 Aug, 2024",
    status: "Accepted",
    logo: company_icon,
  },
  {
    company: "CleanIt",
    title: "House Cleaner",
    location: "Lajpat Nagar, Delhi",
    date: "01 Sep, 2024",
    status: "Rejected",
    logo: company_icon,
  },
  {
    company: "BuildPro",
    title: "Construction Labor",
    location: "Faridabad, Haryana",
    date: "10 Sep, 2024",
    status: "Pending",
    logo: company_icon,
  },
  {
    company: "ColorCraft",
    title: "Painter",
    location: "Sector 22, Noida",
    date: "15 Sep, 2024",
    status: "Accepted",
    logo: company_icon,
  },
];
  

export const manageJobsData = [
  { _id: 1, title: "Plumber", date: 1729681667114, location: "Sector 5, Gurugram, Haryana", applicants: 12 },
  { _id: 2, title: "Electrician Helper", date: 1729681667114, location: "Connaught Place, Delhi", applicants: 18 },
  { _id: 3, title: "House Cleaner", date: 1729681667114, location: "Lajpat Nagar, Delhi", applicants: 7 },
  { _id: 4, title: "Construction Labor", date: 1729681667114, location: "Faridabad, Haryana", applicants: 21 },
];
  

export const jobsData = [
  {
    _id: "1",
    title: "Plumber",
    location: "Sector 5, Gurugram, Haryana",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    wage: "₹500/day",
    shift: "Full Day",
    companyName: "UrbanFix",
    postedBy: "urbanfix@gmail.com",
    date: 1729681667114,
    category: "Plumber",
    description: "Fixing leaking taps, pipelines, and bathroom fittings. Basic tools will be provided.",
  },
  {
    _id: "2",
    title: "Electrician Helper",
    location: "Connaught Place, Delhi",
    coordinates: { lat: 28.6315, lng: 77.2167 },
    wage: "₹600/day",
    shift: "Evening",
    companyName: "QuickElectric",
    postedBy: "contact@quickelectric.in",
    date: 1729681667114,
    category: "Electrician",
    description: "Assist senior electricians with wiring and electrical repairs in homes and offices.",
  },
  {
    _id: "3",
    title: "House Cleaner",
    location: "Lajpat Nagar, Delhi",
    coordinates: { lat: 28.5672, lng: 77.2436 },
    wage: "₹400/day",
    shift: "Morning",
    companyName: "CleanIt",
    postedBy: "support@cleanit.com",
    date: 1729681667114,
    category: "Cleaning",
    description: "Looking for female workers to clean 2BHK houses. Daily job.",
  },
  {
    _id: "4",
    title: "Loading & Unloading Worker",
    location: "Manesar Industrial Area, Haryana",
    coordinates: { lat: 28.3573, lng: 76.9300 },
    wage: "₹550/day",
    shift: "Full Day",
    companyName: "Shree Packers",
    postedBy: "shreepackers@jobs.com",
    date: 1729681667114,
    category: "Loading & Unloading",
    description: "Help load and unload materials from trucks in warehouses. Safety gear will be given.",
  },
  {
    _id: "5",
    title: "Painter",
    location: "Sector 22, Noida",
    coordinates: { lat: 28.5904, lng: 77.3341 },
    wage: "₹700/day",
    shift: "Full Day",
    companyName: "ColorCraft",
    postedBy: "hr@colorcraft.in",
    date: 1729681667114,
    category: "Painter",
    description: "Painting interiors of residential flats. Should have past painting experience.",
  },
  {
    _id: "6",
    title: "Construction Labor",
    location: "Faridabad, Haryana",
    coordinates: { lat: 28.4089, lng: 77.3178 },
    wage: "₹650/day",
    shift: "Full Day",
    companyName: "BuildPro",
    postedBy: "info@buildpro.com",
    date: 1729681667114,
    category: "Construction",
    description: "Assisting with brickwork, mixing cement, and carrying materials on-site.",
  },
  {
    _id: "7",
    title: "Carpenter",
    location: "Kalkaji, Delhi",
    coordinates: { lat: 28.5429, lng: 77.2575 },
    wage: "₹800/day",
    shift: "Full Day",
    companyName: "WoodMasters",
    postedBy: "woodmasters@gmail.com",
    date: 1729681667114,
    category: "Carpenter",
    description: "Furniture repair and making cupboards at home renovation site.",
  },
  {
    _id: "8",
    title: "Renovation Helper",
    location: "Ashok Vihar, Delhi",
    coordinates: { lat: 28.6906, lng: 77.1764 },
    wage: "₹600/day",
    shift: "Half Day",
    companyName: "HomeRevamp",
    postedBy: "homerevamp@gmail.com",
    date: 1729681667114,
    category: "Renovation work",
    description: "Assist senior workers with tasks like sanding walls, removing tiles, etc.",
  }
];
