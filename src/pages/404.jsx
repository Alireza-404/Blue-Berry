import Particles from "react-tsparticles";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import SecondaryButton from "../components/Ui/SecondaryButton/SecondaryButton";

export default function NotFoundPage() {
  const { t } = useTranslation();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-body">
      <Particles
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },

          fpsLimit: 60,

          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },

            modes: {
              grab: {
                distance: 240,
                links: {
                  opacity: 0.15,
                },
              },
            },
          },

          particles: {
            number: {
              value: 90,
              density: {
                enable: true,
                area: 1000,
              },
            },

            color: {
              value: ["#3D5CFF", "#6D83FF", "#858597", "#B8B8D2"],
            },

            shape: {
              type: "circle",
            },

            opacity: {
              value: {
                min: 0.15,
                max: 0.45,
              },
              random: true,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.08,
                sync: false,
              },
            },

            size: {
              value: {
                min: 1,
                max: 3,
              },
              random: true,
            },

            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },

            links: {
              enable: false,
            },
          },

          detectRetina: true,
        }}
        init={particlesInit}
      />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex max-w-xl flex-col items-center text-center">
          <span
            className="
              text-8xl font-black tracking-tight
              text-primary
              sm:text-9xl
            "
          >
            404
          </span>

          <h1 className="mt-5 text-2xl font-bold text-TB dark:text-white sm:text-3xl">
            {t("notFound.title")}
          </h1>

          <p
            className="mt-3 max-w-md text-sm leading-7 text-secondary dark:text-secondary-D
            sm:text-base"
          >
            {t("notFound.description")}
          </p>

          <Link to="/">
            <SecondaryButton className={"w-36 h-12 mt-5"}>
              {t("notFound.backHome")}
            </SecondaryButton>
          </Link>
        </div>
      </main>
    </div>
  );
}
