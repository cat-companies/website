import React, { useEffect } from 'react';

function Oneko() {
  useEffect(() => {
    // Create and append the script
    const script = document.createElement('script');
    script.id = 'oneko-script';
    script.textContent = `
      // Oneko cat cursor implementation
      (function () {
        const nekoEl = document.createElement("div");
        nekoEl.id = "oneko";
        nekoEl.style.width = "32px";
        nekoEl.style.height = "32px";
        nekoEl.style.position = "fixed";
        nekoEl.style.pointerEvents = "none";
        nekoEl.style.backgroundImage = "url('data:image/gif;base64,R0lGODlhIAAgALMAAAAAAP///3NKVJxrdKyHkL2Ym9Wip+O1u/Hy8f///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAgACAAAAT/UMhJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gNUYAADs=')";
        nekoEl.style.zIndex = "999";
        document.body.appendChild(nekoEl);

        let mousePosX = 0;
        let mousePosY = 0;
        let frameCount = 0;
        let idleTime = 0;
        let idleAnimation = null;
        let idleAnimationFrame = 0;
        const nekoSpeed = 10;
        const spriteSets = {
          idle: [[-3, -3]],
          alert: [[-7, -3]],
          scratch: [
            [-7, -7],
            [-7, -11],
            [-7, -15],
            [-7, -19],
          ],
          tired: [[-3, -7]],
          sleeping: [
            [-3, -11],
            [-3, -15],
          ],
          N: [[-1, -1]],
          NE: [[-1, -5]],
          E: [[-1, -9]],
          SE: [[-1, -13]],
          S: [[-5, -1]],
          SW: [[-5, -5]],
          W: [[-5, -9]],
          NW: [[-5, -13]],
        };

        function getNekoPosition() {
          return {
            x: parseFloat(nekoEl.style.left || 0),
            y: parseFloat(nekoEl.style.top || 0),
          };
        }

        function setNekoPosition(x, y) {
          nekoEl.style.left = x + "px";
          nekoEl.style.top = y + "px";
        }

        function setNekoSprite(name, frame) {
          const sprite = spriteSets[name][frame % spriteSets[name].length];
          nekoEl.style.backgroundPosition =
            sprite[0] * 32 + "px " + sprite[1] * 32 + "px";
        }

        function handleMouseMove(e) {
          mousePosX = e.clientX;
          mousePosY = e.clientY;
          idleTime = 0;
          idleAnimation = null;
          idleAnimationFrame = 0;
        }

        function determineNekoNextPosition() {
          const { x, y } = getNekoPosition();
          const deltaX = mousePosX - x;
          const deltaY = mousePosY - y;
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

          if (distance < nekoSpeed) {
            return { x, y };
          }

          const moveX = (deltaX / distance) * nekoSpeed;
          const moveY = (deltaY / distance) * nekoSpeed;

          return {
            x: x + moveX,
            y: y + moveY,
          };
        }

        function determineNekoDirection(prevPos, nextPos) {
          const deltaX = nextPos.x - prevPos.x;
          const deltaY = nextPos.y - prevPos.y;

          if (deltaX === 0 && deltaY === 0) return null;

          const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
          const direction = Math.round(angle / 45 + 8) % 8;

          return ["E", "SE", "S", "SW", "W", "NW", "N", "NE"][direction];
        }

        function updateNeko() {
          frameCount++;

          const currentPos = getNekoPosition();
          const nextPos = determineNekoNextPosition();
          const direction = determineNekoDirection(currentPos, nextPos);

          if (direction) {
            setNekoPosition(nextPos.x, nextPos.y);
            setNekoSprite(direction, frameCount);
            idleTime = 0;
            idleAnimation = null;
          } else {
            idleTime++;

            if (idleTime > 10) {
              setNekoSprite(
                idleAnimation || "idle",
                idleAnimation ? idleAnimationFrame : 0
              );

              if (idleTime > 300) {
                if (!idleAnimation) {
                  idleAnimation = "sleeping";
                  idleAnimationFrame = 0;
                }
                if (frameCount % 4 === 0) {
                  idleAnimationFrame++;
                }
              } else if (idleTime > 200) {
                if (!idleAnimation) {
                  idleAnimation = "tired";
                  idleAnimationFrame = 0;
                }
              } else if (idleTime > 50) {
                if (!idleAnimation) {
                  idleAnimation = "scratch";
                  idleAnimationFrame = 0;
                }
                if (frameCount % 4 === 0) {
                  idleAnimationFrame++;
                }
              }
            }
          }

          requestAnimationFrame(updateNeko);
        }

        window.addEventListener("mousemove", handleMouseMove);
        updateNeko();
      })();
    `;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const script = document.getElementById('oneko-script');
      if (script) script.remove();
      
      const neko = document.getElementById('oneko');
      if (neko) neko.remove();
    };
  }, []);

  return null;
}

export default Oneko; 