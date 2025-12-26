import { Folder, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PixelTransition from '@/components/PixelTransition';

// Tooltip Component
function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
      {isVisible && (
        <div
          className="
  absolute top-full left-1/2 -translate-x-1/2 mt-2
  px-2 py-1
  bg-secondary/15
  text-secondary
  text-xs
  rounded-lg
  whitespace-nowrap
  z-10
  backdrop-blur-sm
  border border-secondary/30
  shadow-[0_0_20px_rgba(125,211,252,0.35)]
"
        >
          {text}
          <div
            className="
      absolute bottom-full left-1/2 -translate-x-1/2 -mb-1
      border-4 border-transparent
      border-b-secondary/30
    "
          />
        </div>
      )}
    </div>
  );
}

// GANTI function ProjectCard dengan kode ini:

function ProjectCard({ title, description, technologies, githubUrl, githubBackendUrl, liveUrl, type, previewImage, hoverImage }) {
  const hasMultipleRepos = githubUrl && githubBackendUrl;
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const [showModal, setShowModal] = useState(false);
  const shouldTruncate = description.length > maxLength;

  return (
    <div
      className="
        relative
        bg-gradient-to-b
        from-black
        via-secondary/10
        to-black
        rounded-xl
        shadow-md
        hover:shadow-[0_0_35px_rgba(125,211,252,0.35)]
        transition-all duration-300
        overflow-hidden
        border border-secondary/30
      "
    >
      {/* Grid Layout: Info Kiri | Image Kanan */}
      <div className="grid grid-cols-[1fr_auto] h-full">
        {/* KOLOM KIRI - Info Project */}
        <div className="p-3 sm:p-4 flex flex-col min-w-0">
          {/* Header: Folder Icon & Action Icons */}
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <Folder className="text-secondary w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 stroke-[1.5] flex-shrink-0" />
            <div className="flex gap-1.5 sm:gap-2 text-gray-400 flex-shrink-0">
              {/* GitHub Links */}
              {hasMultipleRepos ? (
                <>
                  {githubUrl && (
                    <Tooltip text="Frontend">
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary transition-colors duration-200"
                      >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer" />
                      </a>
                    </Tooltip>
                  )}
                  {githubBackendUrl && (
                    <Tooltip text="Backend">
                      <a
                        href={githubBackendUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition-colors duration-200"
                      >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer" />
                      </a>
                    </Tooltip>
                  )}
                </>
              ) : (
                githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors duration-200"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer" />
                  </a>
                )
              )}

              {/* Live URL */}
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-200">
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer" />
                </a>
              )}
            </div>
          </div>

          {/* Type Badge */}
          {type && (
            <div className="mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-mono text-secondary bg-secondary/15 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-secondary/40 shadow-[0_0_14px_rgba(125,211,252,0.35)]">
                {type}
              </span>
            </div>
          )}

          {/* Project Title */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-100 mb-1.5 sm:mb-2 line-clamp-2">{title}</h3>

          {/* Project Description */}
          <div className="mb-2 sm:mb-3 flex-1">
            <p className="text-main text-[11px] sm:text-xs leading-relaxed text-justify">
              {isExpanded || !shouldTruncate ? description : `${description.substring(0, maxLength)}...`}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setShowModal(true)}
                className="text-secondary text-[10px] sm:text-xs font-medium hover:text-cyan-300 transition-colors duration-200 mt-1 inline-flex items-center gap-1"
              >
                Read More
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {/* Modal */}
            {showModal && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowModal(false)}
              >
                <div
                  className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-secondary/30 shadow-[0_0_50px_rgba(125,211,252,0.35)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-100">{title}</h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-secondary transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {type && (
                    <span className="text-xs font-mono text-secondary bg-secondary/15 px-2 py-1 rounded-full border border-secondary/40 inline-block mb-4">
                      {type}
                    </span>
                  )}

                  <p className="text-gray-300 text-sm leading-relaxed text-justify mb-4">{description}</p>

                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 font-mono">
                    {technologies.map((tech, index) => (
                      <span key={index} className="hover:text-cyan-400 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Technologies Used */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500 font-mono mt-auto">
            {technologies.map((tech, index) => (
              <span key={index} className="hover:text-cyan-400 transition-colors duration-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN - Image Preview (FULL HEIGHT) */}
        {liveUrl && previewImage && (
          <div className="w-40 sm:w-48 md:w-56 lg:w-64 flex-shrink-0">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
              <PixelTransition
                firstContent={
                  <LazyLoadImage
                    src={previewImage}
                    alt={`${title} preview`}
                    effect="blur"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                }
                secondContent={
                  hoverImage ? (
                    <LazyLoadImage
                      src={hoverImage}
                      alt={`${title} hover`}
                      effect="blur"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        backgroundColor: '#22d3ee',
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 900,
                          fontSize: '0.875rem',
                          color: '#000',
                          textAlign: 'center',
                          padding: '0 16px',
                        }}
                      >
                        View Project
                      </p>
                    </div>
                  )
                }
                gridSize={8}
                pixelColor="rgba(125, 211, 252, 0.7)"
                once={false}
                animationStepDuration={0.25}
                style={{
                  width: '100%',
                  height: '100%',
                  borderTopRightRadius: '12px',
                  borderBottomRightRadius: '12px',
                }}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Project Section
export default function Project() {
  const projects = [
    {
      title: 'Multi Vendor E-Commerce Platform',
      description:
        'A simple multi-vendor e-commerce web application with a secure authentication system using access tokens, refresh tokens, and HTTP-only cookies. The platform allows users to purchase products from multiple sellers in a single checkout flow (still under development). \n\
        The application implements a password recovery feature using OTP verification via email; due to the use of a free email domain, OTP delivery is limited to my registered email address only. The system supports three user roles: Buyer, with a personal dashboard for profile CRUD, account settings, \n\
        password reset, purchase statistics, and address management; Seller, with a dashboard for product CRUD, order management including dispatch to a simulated courier, product analytics with a selectable time range (1–12 months), a wallet system where revenue is credited after order completion, \n\
        and store profile management including logo, banner, social media links, email, and phone number; and Admin, with an administrative dashboard for user management, wallet management via manual top-ups (payment gateway not yet integrated), cache usage monitoring, and global settings including password reset.',
      technologies: ['Vue JS', 'Tailwind CSS', 'Node JS', 'MongoDB'],
      githubUrl: 'https://github.com/yogamuz/shopcart',
      githubBackendUrl: 'https://github.com/yogamuz/shopserver',
      liveUrl: 'https://shopcarts1.netlify.app',
      type: 'Personal Project',
      previewImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_400,f_auto,q_auto/v1764504309/banner-shopcart-laptop_epqkna.jpg',
      hoverImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_400,f_auto,q_auto/v1764504382/banner-shopcart-mobile_jze1qq.jpg',
    },
    {
      title: 'Inventory Management System',
      description:
        'A simple yet functional inventory management system with product CRUD, stock tracking, daily sales overview, and Excel export for 7–30 day sales reports.',
      technologies: ['React JS', 'Tailwind CSS', 'Node JS', 'MongoDB'],
      githubUrl: 'https://github.com/yogamuz/inventory-pos',
      githubBackendUrl: 'https://github.com/yogamuz/inventory-pos-server',
      liveUrl: 'https://bocimanager.netlify.app',
      type: 'Campus Project',
      previewImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1764582853/laptop-boci_ldshpo.jpg',
      hoverImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1764582853/mobile_boci_ycqpth.jpg',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-main mb-4 text-center">Projects</h2>
          <p className="text-secondary text-center max-w-2xl mx-auto text-sm sm:text-base">
            A collection of projects I've built while learning and exploring web development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              githubBackendUrl={project.githubBackendUrl}
              liveUrl={project.liveUrl}
              type={project.type}
              previewImage={project.previewImage}
              hoverImage={project.hoverImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
