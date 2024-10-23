document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".menuItem");
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            // Prevent default link behavior only for internal links
            const targetId = link.getAttribute("href");
            if (targetId.startsWith("#")) {
                event.preventDefault(); // Prevent default link behavior for internal links
                let targetSection = document.querySelector(targetId);
                let offset = 0;
                if (targetId === "#Mission" || targetId === "#home") {
                    offset = 100; // Adjust offset for specific sections if needed
                }
                const targetPosition = targetSection.offsetTop - offset;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
            // External links like sponsors.html will navigate normally
        });
    });
});
