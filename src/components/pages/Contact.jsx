import { useRef, useState, useEffect } from "react";
import React from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const MAX_MESSAGE_LENGTH = 500;

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [activeContact, setActiveContact] = useState("email");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    whatsappName: "",
    whatsappMessage: "",
  });
  const [showEmailHint, setShowEmailHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.message, formData.whatsappMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "message" || name === "whatsappMessage") &&
      value.length > MAX_MESSAGE_LENGTH
    ) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setShowEmailHint(value.length > 0);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    const loadingToast = toast.loading(t("contact.toast.loading"));

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        toast.success(t("contact.toast.success"), {
          id: loadingToast,
        });
        setIsSubmitting(false);
        setFormData({
          ...formData,
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        toast.error(t("contact.toast.error"), {
          id: loadingToast,
        });
        setIsSubmitting(false);
      });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "85941228319";
    const message = `${t("contact.whatsapp.greeting")} ${
      formData.whatsappName
    }. ${formData.whatsappMessage}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/62${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const contactOptions = [
    {
      id: "email",
      icon: FaEnvelope,
      label: t("contact.options.email"),
      color: "text-blue-400",
    },
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      label: t("contact.options.whatsapp"),
      color: "text-green-400",
    },
    {
      id: "maps",
      icon: FaMapMarkerAlt,
      label: t("contact.options.maps"),
      color: "text-red-400",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen px-8 py-8 md:py-12 flex flex-col"
    >
      {/* Header Section */}
      <div className="w-full pt-4 md:pt-6 pb-4 md:pb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-main mb-6">
          {t("contact.title")}
        </h1>

        {/* Contact Options */}
        <div className="flex justify-center">
          <div className="inline-flex items-stretch bg-white/10 backdrop-blur-md rounded-full overflow-hidden shadow-xl border border-white/20">
            {contactOptions.map((option, index) => (
              <div key={option.id} className="flex items-stretch">
                {index > 0 && <div className="w-px bg-white/30" />}
                <button
                  onClick={() => setActiveContact(option.id)}
                  className={`flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 transition-all duration-300 ${
                    activeContact === option.id
                      ? "bg-white/30"
                      : "hover:bg-white/20"
                  }`}
                >
                  <option.icon className={`text-lg ${option.color}`} />
                  <span className="text-sm lg:text-base font-semibold text-main">
                    {option.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex items-center justify-center px-4 md:px-8 flex-1">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="flex justify-center w-full">
              <div className="w-full max-w-md">
                {activeContact === "maps" ? (
                  <div className="w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.153239999!2d106.75946629999999!3d-6.402409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e8f7b4b54e5d%3A0x6dc52f3f239b13f1!2sDepok%2C%20West%20Java!5e0!3m2!1sen!2sid!4v169876543210!5m2!1sen!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-2xl"
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex justify-center w-full">
                    <div className="w-full p-8">
                      <p className="text-main text-justify leading-relaxed">
                        {t("contact.description")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Forms */}
            <div className="flex justify-center lg:justify-center w-full">
              <div className="w-full max-w-md bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl">
                {activeContact === "email" && (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <h3 className="text-2xl font-bold text-main text-center mb-2">
                      {t("contact.email.title")}
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-main text-sm font-medium mb-1.5">
                          {t("contact.email.firstName")}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-main placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          placeholder={t("contact.email.placeholder.firstName")}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-main text-sm font-medium mb-1.5">
                          {t("contact.email.lastName")}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-main placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          placeholder={t("contact.email.placeholder.lastName")}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-main text-sm font-medium mb-1.5">
                        {t("contact.email.emailLabel")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-main placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder={t("contact.email.placeholder.email")}
                        required
                      />
                      {showEmailHint && (
                        <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mt-2">
                          <p className="text-blue-300 text-xs">
                            {t("contact.email.hint")}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-main text-sm font-medium mb-1.5">
                        {t("contact.email.message")}
                      </label>
                      <textarea
                        ref={textareaRef}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        maxLength={MAX_MESSAGE_LENGTH}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-main placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                        placeholder={t("contact.email.placeholder.message")}
                        required
                      />
                      <div className="flex justify-end mt-1">
                        <span
                          className={`text-xs ${
                            formData.message.length >= MAX_MESSAGE_LENGTH
                              ? "text-red-400"
                              : "text-gray-400"
                          }`}
                        >
                          {formData.message.length}/{MAX_MESSAGE_LENGTH}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-main py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting
                        ? t("contact.email.sending")
                        : t("contact.email.button")}
                    </button>
                  </form>
                )}

                {activeContact === "whatsapp" && (
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                    <h3 className="text-2xl font-bold text-main text-center mb-2">
                      {t("contact.whatsapp.title")}
                    </h3>

                    <div>
                      <label className="block text-main text-sm font-medium mb-1.5">
                        {t("contact.whatsapp.name")}
                      </label>
                      <input
                        type="text"
                        name="whatsappName"
                        value={formData.whatsappName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-main placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        placeholder={t("contact.whatsapp.placeholder.name")}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-main text-sm font-medium mb-1.5">
                        {t("contact.whatsapp.message")}
                      </label>
                      <textarea
                        ref={textareaRef}
                        name="whatsappMessage"
                        value={formData.whatsappMessage}
                        onChange={handleInputChange}
                        rows={4}
                        maxLength={MAX_MESSAGE_LENGTH}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-main placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none"
                        placeholder={t("contact.whatsapp.placeholder.message")}
                        required
                      />
                      <div className="flex justify-end mt-1">
                        <span
                          className={`text-xs ${
                            formData.whatsappMessage.length >=
                            MAX_MESSAGE_LENGTH
                              ? "text-red-400"
                              : "text-gray-400"
                          }`}
                        >
                          {formData.whatsappMessage.length}/{MAX_MESSAGE_LENGTH}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-main py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>{t("contact.whatsapp.button")}</span>
                      <FaWhatsapp className="text-lg" />
                    </button>
                  </form>
                )}

                {activeContact === "maps" && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-main text-center mb-2">
                      {t("contact.maps.title")}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <FaMapMarkerAlt className="text-red-400 text-xl mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-main font-semibold">
                            {t("contact.maps.location")}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">
                            {t("contact.maps.description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
