 // Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // -------- POPUP FUNCTIONALITY --------
    const firstPopup = document.getElementById("imagePopup");
    const secondPopup = document.getElementById("secondPopup");
    const closeFirst = document.getElementById("closeFirst");
    const closeSecond = document.getElementById("closeSecond");

    // Show first popup after DOM is loaded
    if (firstPopup) {
        firstPopup.classList.add("active");
    }

    // Close first popup → open second popup
    if (closeFirst) {
        closeFirst.onclick = function() {
            firstPopup.classList.remove("active");
            setTimeout(() => {
                if (secondPopup) {
                    secondPopup.classList.add("active");
                }
            }, 300);
        };
    }

    // Close second popup
    if (closeSecond) {
        closeSecond.onclick = function() {
            secondPopup.classList.remove("active");
        };
    }

    // -------- IMAGE SLIDER --------
    const images = document.querySelectorAll('.hero img');
    const dots = document.querySelectorAll('.dot');
    
    if (images.length > 0 && dots.length > 0) {
        let currentIndex = 0;
        const total = images.length;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
                dots[i].classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        // Auto-slide every 5 seconds
        setInterval(() => {
            let nextIndex = (currentIndex + 1) % total;
            showImage(nextIndex);
        }, 5000);

        // Dot click events
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                showImage(parseInt(dot.dataset.index));
            });
        });
    }

    // -------- NEWS TICKER --------
    const newsData = [
        "सदस्यलाई डिजिटल सेवाको सुरुवात, अब मोबाइल एपमार्फत बचत तथा ऋण सुविधा",
        "सहकारीमा सदस्य शिक्षा कार्यक्रम प्रारम्भ, वित्तीय साक्षरता बढाउने लक्ष्य", 
        "नयाँ बचत योजना घोषणा, उच्च ब्याजदर सहित दीर्घकालीन बचतमा प्रोत्साहन",
        "सहकारीको वार्षिक साधारणसभा सम्पन्न, आगामी वर्षको कार्ययोजना सार्वजनिक",
        "साना उद्यमीलाई सहुलियत ऋण, महिलामैत्री कार्यक्रम संचालन"
    ];

    let currentNewsIndex = 0;

    function typeText(element, text, speed = 50) {
        return new Promise(resolve => {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    async function displayNews() {
        const newsContainer = document.getElementById('newsContainer');
        
        if (!newsContainer) return;
        
        for (let i = 0; i < newsData.length; i++) {
            const news = newsData[i];
            
            // Clear previous news
            newsContainer.innerHTML = '';
            
            // Create news item container
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsContainer.appendChild(newsItem);
            
            // Type the news
            await typeText(newsItem, news, 80);
            
            // Wait before showing next news
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
        // Restart the cycle
        displayNews();
    }

    // Start the news display after a delay
    setTimeout(displayNews, 1000);

    // -------- EMI CALCULATOR --------
    function formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }

    function calculateEMI() {
        const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
        const annualRate = parseFloat(document.getElementById('interestRate').value) || 0;
        const tenure = parseFloat(document.getElementById('loanTenure').value) || 0;
        const tenureType = document.getElementById('tenureType').value;

        const monthlyRate = annualRate / 12 / 100;
        const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure;

        if (loanAmount && annualRate && tenure) {
            const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                       (Math.pow(1 + monthlyRate, tenureMonths) - 1);
            
            const totalAmount = emi * tenureMonths;
            const interestPayable = totalAmount - loanAmount;

            document.getElementById('monthlyEMI').textContent = formatCurrency(Math.round(emi));
            document.getElementById('principalAmount').textContent = formatCurrency(loanAmount);
            document.getElementById('interestPayable').textContent = formatCurrency(Math.round(interestPayable));
            document.getElementById('totalAmount').textContent = formatCurrency(Math.round(totalAmount));
        }
    }

    // Setup EMI calculator event listeners
    const loanAmount = document.getElementById('loanAmount');
    const loanSlider = document.getElementById('loanSlider');
    const interestRate = document.getElementById('interestRate');
    const rateSlider = document.getElementById('rateSlider');
    const loanTenure = document.getElementById('loanTenure');
    const tenureSlider = document.getElementById('tenureSlider');
    const tenureType = document.getElementById('tenureType');

    if (loanAmount && loanSlider) {
        // Loan Amount
        loanAmount.addEventListener('input', function() {
            loanSlider.value = this.value;
            calculateEMI();
        });
        loanSlider.addEventListener('input', function() {
            loanAmount.value = this.value;
            calculateEMI();
        });
    }

    if (interestRate && rateSlider) {
        // Interest Rate
        interestRate.addEventListener('input', function() {
            rateSlider.value = this.value;
            calculateEMI();
        });
        rateSlider.addEventListener('input', function() {
            interestRate.value = this.value;
            calculateEMI();
        });
    }

    if (loanTenure && tenureSlider) {
        // Loan Tenure
        loanTenure.addEventListener('input', function() {
            tenureSlider.value = this.value;
            calculateEMI();
        });
        tenureSlider.addEventListener('input', function() {
            loanTenure.value = this.value;
            calculateEMI();
        });
    }

    if (tenureType) {
        tenureType.addEventListener('change', calculateEMI);
    }

    // Initial calculation
    calculateEMI();

    // -------- HOVER EFFECTS FOR STATS --------
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
})