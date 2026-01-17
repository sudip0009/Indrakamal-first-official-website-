 
        let currentImage = 1;
        let isAnimating = false;
        
        function slideToNextImage() {
            if (isAnimating) return;
            
            const img1 = document.getElementById('logoImage1');
            const img2 = document.getElementById('logoImage2');
            
            isAnimating = true;
            
            if (currentImage === 1) {
                // Slide from image 1 to image 2
                slideOut(img1, () => {
                    slideIn(img2, () => {
                        currentImage = 2;
                        isAnimating = false;
                    });
                });
            } else {
                // Slide from image 2 to image 1
                slideOut(img2, () => {
                    slideIn(img1, () => {
                        currentImage = 1;
                        isAnimating = false;
                    });
                });
            }
        }
        
        function slideOut(element, callback) {
            element.style.opacity = '1';
            
            let opacity = 1;
            const endOpacity = 0;
            const duration = 500;
            const frameRate = 60;
            const totalFrames = (duration / 1000) * frameRate;
            const stepSize = (endOpacity - opacity) / totalFrames;
            
            function animate() {
                opacity += stepSize;
                element.style.opacity = Math.max(0, opacity);
                
                if (opacity > endOpacity) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                    element.style.opacity = '0';
                    callback();
                }
            }
            animate();
        }
        
        function slideIn(element, callback) {
            element.style.display = 'block';
            element.style.opacity = '0';
            
            let opacity = 0;
            const endOpacity = 1;
            const duration = 500;
            const frameRate = 60;
            const totalFrames = (duration / 1000) * frameRate;
            const stepSize = (endOpacity - opacity) / totalFrames;
            
            function animate() {
                opacity += stepSize;
                element.style.opacity = Math.min(1, opacity);
                
                if (opacity < endOpacity) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.opacity = '1';
                    callback();
                }
            }
            animate();
        }
        
        setInterval(slideToNextImage, 5000);
    