import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import ContentPage from "./pages/ContentPage.jsx";
import Financing from "./pages/Financing.jsx";
import PatientForms from "./pages/PatientForms.jsx";
import Videos from "./pages/Videos.jsx";
import Team from "./pages/Team.jsx";
import Technology from "./pages/Technology.jsx";
import WhyChooseUs from "./pages/WhyChooseUs.jsx";
import PatientGallery from "./pages/PatientGallery.jsx";
import Publications from "./pages/Publications.jsx";
import Reviews from "./pages/Reviews.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/referral/Login.jsx";
import Dashboard from "./pages/referral/Dashboard.jsx";
import ProtectedRoute from "./components/referral/ProtectedRoute.jsx";
import ManageReferrals from "./staff/ManageReferrals.jsx";
import StaffLogin from "./staff/pages/Login.jsx";
import StaffLayout from "./staff/components/StaffLayout.jsx";
import StaffProtectedRoute from "./staff/StaffProtectedRoute.jsx";
import Overview from "./staff/pages/Overview.jsx";
import ManageDoctors from "./staff/pages/ManageDoctors.jsx";
import ManagePatients from "./staff/pages/ManagePatients.jsx";
import ManageAppointments from "./staff/pages/ManageAppointments.jsx";
import ManageContent from "./staff/pages/ManageContent.jsx";
import ManageVideos from "./staff/pages/ManageVideos.jsx";
import ManageReviews from "./staff/pages/ManageReviews.jsx";
import ManageClinicalForms from "./staff/pages/ManageClinicalForms.jsx";
import IntakeForms from "./staff/pages/IntakeForms.jsx";
import Reports from "./staff/pages/Reports.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public marketing site */}
      <Route path="/*" element={<PublicSite />} />

      {/* Hospital / practice staff dashboard -- fully separate shell,
          no public Navbar/Footer, own auth gate. */}
      <Route path="/office-portal/login" element={<StaffLogin />} />
      <Route
        path="/office-portal/dashboard"
        element={
          <StaffProtectedRoute>
            <StaffLayout />
          </StaffProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="doctors" element={<ManageDoctors />} />
        <Route path="patients" element={<ManagePatients />} />
        <Route path="appointments" element={<ManageAppointments />} />
        <Route path="content" element={<ManageContent />} />
        <Route path="videos" element={<ManageVideos />} />
        <Route path="reviews" element={<ManageReviews />} />
        <Route path="clinical-forms" element={<ManageClinicalForms />} />
        <Route path="intake" element={<IntakeForms />} />
        <Route path="reports" element={<Reports />} />
        {/* <Route path="referrals" element={<ManageReferrals />} /> */}
      </Route>
    </Routes>
  );
}

function PublicSite() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn/:slug" element={<ContentPage />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/patient-forms" element={<PatientForms />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/team" element={<Team />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/patient-gallery" element={<PatientGallery />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/referral-portal" element={<Login />} />
          <Route
            path="/referral-portal/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return <div className="max-w-2xl mx-auto px-4 py-20 text-center text-ink/60">Page not found.</div>;
}
