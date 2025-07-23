import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // smaller bundle

const ParticlesBg = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // loads only the slim version (lightweight)
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles loaded:", container);
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: { value: "" }, // background color
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            particles: {
              color: { value: "#ffffff" },
              links: {
                enable: true,
                color: "#ffffff",
                distance: 150,
                opacity: 0.5,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                outModes: { default: "bounce" },
              },
              number: { value: 200, density: { enable: true, area: 800 } },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
};

export default ParticlesBg;
