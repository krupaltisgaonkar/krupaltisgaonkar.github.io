const things = {
	headerBackground: 
		function(){
			const canvas = document.getElementById('Matrix');
			const context = canvas.getContext('2d');
			const first = 5/10
			const niceoo = window.innerHeight * first
			let home = true
			let about
			let myProjects
			let contact
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight + niceoo
			const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
			const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			const nums = '0123456789';

			const alphabet = katakana + latin + nums;
			let speed = 30
			let fontSize = 16;
			let rainDrops = [];
			let columns = canvas.width/fontSize;

			window.addEventListener("scroll", () => {
				console.log(window.scrollY)
				const scroll = window.scrollY
				if (scroll >= 0 && scroll <= 400){
					home = true
					about = false
					contact = false
					myProjects = false
					fontSize = 16
					console.log(home)
				} else if (scroll > 400 && scroll <= 998){
					myProjects = false
					about = true
					home = false
					contact = false
					fontSize = 16
					console.log(about)
				} else if (scroll > 998 && scroll <= 1624){
					about = false
					home = false
					myProjects = true
					contact = false
					fontSize = 16
					console.log(about)
				} else if (scroll > 1624){
					about = false
					home = false
					myProjects = false
					contact = true
					fontSize = 16
					console.log(about)
				}
				
			})
			
			for ( let x = 0; x < columns; x++ ) {
				rainDrops[x] = 1;
			}
			const draw = () => {
				context.fillStyle = 'rgba(0, 0, 0, 0.1)';
				context.fillRect(0, 0, canvas.width, canvas.height);
				
				context.fillStyle = '#0F0';
				context.font = fontSize + 'px monospace';

				for(let i = 0; i < rainDrops.length; i++)
				{
					let text;
					if (home){text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))}
					else if(about){text = "about"}
					else if(contact){text = "contact"}
					else if (myProjects){text = "my projects"}
					context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
					
					if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
						rainDrops[i] = 0;
					}
					rainDrops[i]++;
				}
			};

			setInterval(draw, 80);
		}
	,
	typewriterEffect:
		function(){
			const array = ["Frontend Developer🦋.", "Soccer Player⚽.", "Coder💻.", "Student🧑🏻‍🎓.", "Middle Schooler🎒."];
			let text = document.getElementById("typing-effect-features");

			function typeEffect(index = 0, charIndex = 0) {
				if (charIndex < array[index].length) {
					text.textContent += array[index][charIndex]; // Add the next character
					setTimeout(() => typeEffect(index, charIndex + 1), 150); // Type the next character
				} else {
					setTimeout(() => deleteEffect(index), 1500); // Pause before deleting
				}
			}

			function deleteEffect(index, charIndex = array[index].length) {
				if (charIndex > 0) {
					text.textContent = text.textContent.slice(0, -1); // Remove the last character
					setTimeout(() => deleteEffect(index, charIndex - 1), 70); // Delete the next character
				} else {
					const nextIndex = (index + 1) % array.length; // Move to the next item in order
					setTimeout(() => typeEffect(nextIndex), 500); // Pause before typing the next item
				}
			}

			// Start the typing effect with the first item in the array
			typeEffect(0);
		}
	,
	cursor: 
		function () {
			document.body.style.cursor = "none"
			let mouse = document.createElement("div")
			mouse.id = "mouse"
			document.body.appendChild(mouse)
			let mouseInside = document.createElement("div")
			mouseInside.id = "mouse-inside"
			mouse.appendChild(mouseInside)
			const randomElements = document.querySelectorAll('[onclick]');
			// Function to check if two elements are touching
			function isTouchingElement(div, element) {
				const divRect = div.getBoundingClientRect();
				const elementRect = element.getBoundingClientRect();

				return !(divRect.right < elementRect.left ||
						divRect.left > elementRect.right ||
						divRect.bottom < elementRect.top ||
						divRect.top > elementRect.bottom);
			}

				// Function to update the border if touching
			function checkIfTouching() {
				let isTouching = false;
				randomElements.forEach(element => {
					if (isTouchingElement(mouse, element)) {
						isTouching = true;
						mouse.style.border = '2px solid white';
						mouseInside.style.width = "3px"
						mouseInside.style.height = "3px"
					}
				});

				// Reset border if not touching any element
				if (!isTouching) {
					mouse.style.border = 'none';
					mouseInside.style.width = "15px"
					mouseInside.style.height = "15px"
				}
			}
			document.addEventListener("scroll", (e) => {
				mouse.style.display = "block"
				// Update controlled div position based on mouse coordinates
				mouse.style.left = e.pageX -15 + 'px';
				mouse.style.top = e.pageY - 13 + 'px';
				checkIfTouching(); // Check if touching after moving
			})
			document.addEventListener('mousemove', (e) => {
				mouse.style.display = "block"
				// Update controlled div position based on mouse coordinates
				mouse.style.left = e.pageX -15 + 'px';
				mouse.style.top = e.pageY - 13 + 'px';
				checkIfTouching(); // Check if touching after moving
			});
			document.addEventListener("mouseleave", () => {
				mouse.style.display = "none"
			})
		}
	,

	tilt: 
		function(){
			const tiltEffectSettings = {
				max: 10, // max tilt rotation (degrees (deg))
				perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
				scale: 1.1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
				speed: 300, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
				easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
			  };
			  
			  const cards = document.querySelectorAll(".card");
			  
			  cards.forEach(card => {
				card.addEventListener("mouseenter", cardMouseEnter);
				card.addEventListener("mousemove", cardMouseMove);
				card.addEventListener("mouseleave", cardMouseLeave);
			  });
			  
			  function cardMouseEnter(event) {
				setTransition(event);
			  }
			  
			  function cardMouseMove(event) {
				const card = event.currentTarget;
				const cardWidth = card.offsetWidth;
				const cardHeight = card.offsetHeight;
				const centerX = card.offsetLeft + cardWidth/2;
				const centerY = card.offsetTop + cardHeight/2;
				const mouseX = event.clientX - centerX;
				const mouseY = event.clientY - centerY;
				const rotateXUncapped = (+1)*tiltEffectSettings.max*mouseY/(cardHeight/2);
				const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(cardWidth/2);
				const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
								(rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
				const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
								(rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);
			  
				card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
										scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
			  }
			  
			  function cardMouseLeave(event) {
				event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
				setTransition(event);
			  }
			  
			  function setTransition(event) {
				const card = event.currentTarget;
				clearTimeout(card.transitionTimeoutId);
				card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
				card.transitionTimeoutId = setTimeout(() => {
				  card.style.transition = "";
				}, tiltEffectSettings.speed);
			  }
		}
	,
	contact :
		function (){
			function sendMail() {
				var params = {
				  name: document.getElementById("name").value,
				  email: document.getElementById("email").value,
				  message: document.getElementById("message").value,
				};

			  
				const serviceID = "service_ns1y6ph";
				const templateID = "template_9prgw67";
			  
				  emailjs.send(serviceID, templateID, params)
				  .then(res=>{
					  document.getElementById("name").value = ""
					  document.getElementById("email").value = ""
					  document.getElementById("message").value = ""
					  console.log(res);
					  setTimeout(function() {
						document.getElementById("green").textContent = "Successfuly sent email!"					  
					  }, 1000);
					  document.getElementById("green").textContent = ""
			  
				  })
				  .catch(
					(err)=> {
						console.log(err)
					setTimeout(function() {
						document.getElementById("red").textContent = "Error sending email :(. Visit the console for more info."					  
					  }, 1000);
					  document.getElementById("red").textContent = ""
					}
					);
				  
			  
			  }

			  document.getElementById("send-mail").addEventListener("click", sendMail)
		}
	
	,
}



function runApp(){
	things.headerBackground()
	things.typewriterEffect()
	const userAgent = navigator.userAgent;
	if (/Mobi|Android/i.test(userAgent) || /Tablet|iPad/i.test(userAgent)) {
		console.log("not using cursor")
	} else {
		things.cursor()
	}
	things.tilt()
	things.contact()
}

runApp()