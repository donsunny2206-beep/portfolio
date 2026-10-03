document.addEventListener('DOMContentLoaded', () => {

    /* --- STARTUP PRELOADER & SEAMLESS REVEAL ANIMATION --- */
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderStatus = document.getElementById('preloader-status');

    if (preloader && preloaderBar && preloaderStatus) {
        let progress = 0;
        const statuses = [
            "INITIALIZING LINUX KERNEL & SYSTEM MODULES...",
            "LOADING PYTHON & JAVA PLATFORM ENGINES...",
            "COMPILING SYSTEM MATRIX & UI ASSETS...",
            "SYSTEM READY."
        ];

        const interval = setInterval(() => {
            progress += 5;
            preloaderBar.style.width = `${progress}%`;

            if (progress === 25) preloaderStatus.textContent = statuses[0];
            if (progress === 55) preloaderStatus.textContent = statuses[1];
            if (progress === 85) preloaderStatus.textContent = statuses[2];
            if (progress >= 100) {
                preloaderStatus.textContent = statuses[3];
                clearInterval(interval);

                setTimeout(() => {
                    gsap.to(preloader, {
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.inOut',
                        onComplete: () => {
                            preloader.style.display = 'none';
                            initHeroAnimations();
                        }
                    });
                }, 300);
            }
        }, 40);
    } else {
        initHeroAnimations();
    }

    /* --- Custom Cursor Tracking --- */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const animateCursorRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursorRing);
        };
        animateCursorRing();

        const hoverables = document.querySelectorAll('.magnetic, a, button, .project-card-clean, .tool-card, .process-item, .term-btn');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    /* --- Magnetic Micro-Interactions --- */
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    /* --- VanillaTilt 3D Cards --- */
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
            scale: 1.01
        });
    }

    /* --- Process Step Interactions --- */
    const processItems = document.querySelectorAll('.process-item');
    const circleQuote = document.querySelector('.circle-quote');

    const processQuotes = {
        '01': '"Deep discovery builds the foundation of scalable tech architectures."',
        '02': '"Clear definition turns complex engineering into clean microservice design."',
        '03': '"Crafting visuals where every pixel, color, and gesture serves a purpose."',
        '04': '"Writing clean, multi-threaded code in Python & Java for ultra-low latency."',
        '05': '"Automated Linux deployment pipelines & continuous uptime monitoring."'
    };

    processItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            processItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const step = item.getAttribute('data-step');
            if (processQuotes[step] && circleQuote) {
                gsap.to(circleQuote, {
                    opacity: 0,
                    y: -5,
                    duration: 0.2,
                    onComplete: () => {
                        circleQuote.textContent = processQuotes[step];
                        gsap.to(circleQuote, { opacity: 1, y: 0, duration: 0.3 });
                    }
                });
            }
        });
    });

    /* --- INTERACTIVE LINUX TERMINAL --- */
    const termInput = document.getElementById('term-input');
    const termBtns = document.querySelectorAll('.term-btn');

    const runCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase();
        if (!cleanCmd) return;

        const outputContainer = document.querySelector('.terminal-skills-container');

        if (cleanCmd === 'clear') {
            outputContainer.innerHTML = '';
            appendTermLine('System buffer cleared.');
            return;
        }

        appendTermLine(`don@dev-box:~$ ${cmd}`);

        if (cleanCmd === 'help') {
            appendTermLine(`Available Commands: <br>
            - <span class="term-user">./sysinfo</span> : Display Linux Kernel & Hardware specifications.<br>
            - <span class="term-user">./list_tools</span> : Output engineering stack tools.<br>
            - <span class="term-user">cat contact.json</span> : Output contact information.<br>
            - <span class="term-user">clear</span> : Reset terminal output.`);
        } else if (cleanCmd === './sysinfo') {
            appendTermLine(`OS: Linux 6.8.0-generic x86_64 <br>
            Kernel: Linux RHEL / Debian Hardened Enterprise <br>
            CPU: Multi-Threaded High-Throughput Processor <br>
            Memory: 64 GB DDR5 ECC RAM <br>
            Primary Stack: Python 3.12, Java 21 LTS, Linux Admin, Bash/eBPF`);
        } else if (cleanCmd === './list_tools') {
            appendTermLine(`Tools Loaded: Figma, Python, Java, Linux Admin, Webflow, Framer, Notion, Slack.`);
        } else if (cleanCmd === 'cat contact.json') {
            appendTermLine(`{ <br>
            &nbsp;&nbsp;"email": "donsunny2206@gmail.com", <br>
            &nbsp;&nbsp;"phone": "+91 9074358183", <br>
            &nbsp;&nbsp;"location": "Mananthavady, Wayanad, Kerala, India", <br>
            &nbsp;&nbsp;"linkedin": "https://www.linkedin.com/in/don-sunny-b6b359381", <br>
            &nbsp;&nbsp;"status": "OPEN_FOR_PROJECTS" <br>
            }`);
        } else {
            appendTermLine(`bash: command not found: ${cmd}. Type '<span class="term-user">help</span>' for options.`);
        }
    };

    function appendTermLine(htmlText) {
        const termContainer = document.querySelector('.terminal-skills-container');
        const div = document.createElement('div');
        div.className = 'term-line term-sub';
        div.style.marginTop = '0.5rem';
        div.innerHTML = htmlText;
        termContainer.appendChild(div);
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                runCommand(termInput.value);
                termInput.value = '';
            }
        });
    }

    termBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            runCommand(cmd);
        });
    });

    /* --- GSAP HERO REVEAL & SCROLL-DRIVEN DISSOLVE --- */
    function initHeroAnimations() {
        if (typeof gsap === 'undefined') return;

        gsap.from('.giant-name-text', {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.from('.giant-subname-text', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
        });
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // HERO SCROLL DISSOLVE EFFECT ("BECOMES LESS AND LESS AS YOU SCROLL DOWN")
        gsap.to('#hero-motion-graphic', {
            scrollTrigger: {
                trigger: '.hero-section-karimi',
                start: 'top top',
                end: 'bottom 20%',
                scrub: true
            },
            opacity: 0,
            scale: 0.82,
            y: -75,
            filter: 'blur(15px)',
            ease: 'none'
        });

        const sections = document.querySelectorAll('.projects-section, .process-section, .terminal-skills-section, .tools-section, .footer-section');

        sections.forEach(section => {
            gsap.from(section.querySelectorAll('.section-title-serif, .project-card-clean, .tool-card, .process-item, .terminal-window'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        });
    }

    /* --- Navbar Scroll Blur --- */
    const headerNav = document.querySelector('.header-nav');
    if (headerNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                headerNav.style.padding = '0.85rem 0';
                headerNav.style.background = 'rgba(18, 18, 18, 0.9)';
                headerNav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            } else {
                headerNav.style.padding = '1.25rem 0';
                headerNav.style.background = 'rgba(28, 28, 28, 0.75)';
                headerNav.style.boxShadow = 'none';
            }
        });
    }
});
