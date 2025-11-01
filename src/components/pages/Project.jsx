import { Folder, Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Tooltip Component
function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}

// Project Card Component
function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  githubBackendUrl,
  liveUrl,
  type,
}) {
  const { t } = useTranslation();
  const hasMultipleRepos = githubUrl && githubBackendUrl;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-md hover:shadow-2xl hover:shadow-gray-700/50 hover:-translate-y-2 hover:scale-105 transition-all duration-300 h-full flex flex-col">
      {/* Header: Folder Icon & Action Icons */}
      <div className="flex justify-between items-start mb-4">
        <Folder className="text-gray-300 w-10 h-10 stroke-[1.5]" />
        <div className="flex gap-3 text-gray-400">
          {/* GitHub Links */}
          {hasMultipleRepos ? (
            <>
              {githubUrl && (
                <Tooltip text={t("project.tooltip.frontend")}>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    <Github className="w-5 h-5 cursor-pointer" />
                  </a>
                </Tooltip>
              )}
              {githubBackendUrl && (
                <Tooltip text={t("project.tooltip.backend")}>
                  <a
                    href={githubBackendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#64FFDA] transition-colors duration-200"
                  >
                    <Github className="w-5 h-5 cursor-pointer" />
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
                className="hover:text-[#64FFDA] transition-colors duration-200"
              >
                <Github className="w-5 h-5 cursor-pointer" />
              </a>
            )
          )}

          {/* Live URL */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#64FFDA] transition-colors duration-200"
            >
              <ExternalLink className="w-5 h-5 cursor-pointer" />
            </a>
          )}
        </div>
      </div>
      {/* Type Badge */}
      {type && (
        <div className="mb-3">
          <span className="text-xs font-mono text-gray-300 bg-gray-700/50 px-3 py-1 rounded-full">
            {type}
          </span>
        </div>
      )}
      {/* Project Title */}
      <h3 className="text-xl font-bold text-gray-100 mb-3">{title}</h3>

      {/* Project Description */}
      <p className="text-gray-300 text-sm mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Technologies Used */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-400 font-mono">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="hover:text-gray-200 transition-colors duration-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

// Main Project Section
export default function Project() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("project.items.0.title"),
      description: t("project.items.0.description"),
      technologies: ["Vue JS", "Tailwind CSS", "Node JS", "MongoDB"],
      githubUrl: "https://github.com/yogamuz/shopcart",
      githubBackendUrl: "https://github.com/yogamuz/shopserver",
      liveUrl: "https://shopcarts1.netlify.app",
      type: t("project.items.0.type"),
    },
  ];

  return (
    <div className="w-full px-6 sm:px-8 py-16 md:py-24 bg-gradient-to-brn">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-main mb-4 text-center">
            {t("project.title")}
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
