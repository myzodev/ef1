import db from '../db.js'

const seedArticles = async () => {
	try {
		await db.query(`
            INSERT INTO articles (title, slug, text, category, image) VALUES
            ('The Evolution of F1 Cars', 'the-evolution-of-f1-cars', 'From the early days of Formula 1 to the modern era, F1 cars have undergone significant changes in design, technology, and performance. This article explores the key milestones in the evolution of F1 cars.', 'Technology', '/images/placeholder-1.webp'),
            ('Top 10 F1 Drivers of All Time', 'top-10-f1-drivers-of-all-time', 'Formula 1 has seen many legendary drivers over the years. This article ranks the top 10 F1 drivers of all time based on their achievements, skills, and impact on the sport.', 'History', '/images/placeholder-2.webp'),
            ('The Business of Formula 1', 'the-business-of-formula-1', 'Formula 1 is not just a sport, but a global business. From sponsorship deals to broadcasting rights, the financial aspects of F1 play a crucial role in the sustainability and growth of the teams and the sport itself.', 'Business', '/images/placeholder-3.webp'),
            ('Women in Formula 1', 'women-in-formula-1', 'Women have been making significant strides in Formula 1, both on and off the track. From drivers to engineers and team principals, women are increasingly playing vital roles in the sport.', 'Diversity', '/images/placeholder-4.webp'),
            ('The Impact of Weather on F1 Races', 'the-impact-of-weather-on-f1-races', 'Weather conditions can have a dramatic impact on the outcome of a Formula 1 race. From rain-soaked tracks to extreme heat, teams must adapt their strategies to cope with the changing conditions.', 'Strategy', '/images/placeholder-1.webp'),
            ('The Role of Simulators in F1', 'the-role-of-simulators-in-f1', 'Simulators have become an essential tool for Formula 1 teams. They allow drivers to practice and engineers to test new setups and strategies in a virtual environment, saving time and resources.', 'Technology', '/images/placeholder-2.webp'),
            ('The Legacy of Ayrton Senna', 'the-legacy-of-ayrton-senna', 'Ayrton Senna is widely regarded as one of the greatest drivers in Formula 1 history. His incredible talent, determination, and charisma left a lasting legacy on the sport and inspired countless fans and drivers.', 'History', '/images/placeholder-3.webp'),
            ('The Future of F1: Electric and Hybrid Technologies', 'the-future-of-f1-electric-and-hybrid-technologies', 'As the world moves towards more sustainable energy sources, Formula 1 is also exploring electric and hybrid technologies. This article discusses the potential future of F1 with these advancements.', 'Technology', '/images/placeholder-4.webp'),
            ('The Most Memorable F1 Races', 'the-most-memorable-f1-races', 'Formula 1 has had its fair share of unforgettable races. This article recounts some of the most thrilling and memorable races in F1 history.', 'History', '/images/placeholder-1.webp'),
            ('The Importance of Aerodynamics in F1', 'the-importance-of-aerodynamics-in-f1', 'Aerodynamics plays a crucial role in the performance of F1 cars. This article explains the importance of aerodynamics and how teams optimize their cars for maximum efficiency.', 'Technology', '/images/placeholder-2.webp'),
            ('The Rise of Young F1 Drivers', 'the-rise-of-young-f1-drivers', 'In recent years, young drivers have been making a significant impact in Formula 1. This article highlights some of the rising stars in the sport and their journey to the top.', 'Profiles', '/images/placeholder-3.webp'),
            ('The Role of Strategy in F1', 'the-role-of-strategy-in-f1', 'Strategy is a key component of success in Formula 1. This article delves into the various strategic elements that teams consider during a race, from tire choices to pit stop timings.', 'Strategy', '/images/placeholder-4.webp'),
            ('The Evolution of F1 Safety Measures', 'the-evolution-of-f1-safety-measures', 'Safety has always been a top priority in Formula 1. This article explores the evolution of safety measures in the sport, from the introduction of the HANS device to the Halo system.', 'Safety', '/images/placeholder-1.webp'),
            ('The Impact of F1 on Automotive Technology', 'the-impact-of-f1-on-automotive-technology', 'Many innovations in automotive technology have their roots in Formula 1. This article discusses how F1 has influenced the development of various technologies used in everyday cars.', 'Technology', '/images/placeholder-2.webp'),
            ('The Most Successful F1 Teams', 'the-most-successful-f1-teams', 'Over the years, several teams have dominated the Formula 1 scene. This article looks at the most successful F1 teams and their contributions to the sport.', 'History', '/images/placeholder-3.webp'),
            ('The Role of Data Analysis in F1', 'the-role-of-data-analysis-in-f1', 'Data analysis is a critical aspect of modern Formula 1. This article explains how teams use data to gain a competitive edge and improve their performance on the track.', 'Technology', '/images/placeholder-4.webp'),
            ('The Challenges of Hosting an F1 Race', 'the-challenges-of-hosting-an-f1-race', 'Hosting a Formula 1 race is no small feat. This article explores the various challenges that organizers face, from logistics to ensuring the safety of drivers and spectators.', 'Business', '/images/placeholder-1.webp'),
            ('The Evolution of F1 Circuits', 'the-evolution-of-f1-circuits', 'F1 circuits have evolved significantly over the years. This article takes a look at the changes in circuit design and how they have impacted the sport.', 'History', '/images/placeholder-2.webp'),
            ('The Role of Team Principals in F1', 'the-role-of-team-principals-in-f1', 'Team principals play a crucial role in the success of an F1 team. This article highlights the responsibilities of team principals and their impact on the sport.', 'Profiles', '/images/placeholder-3.webp'),
            ('The Impact of F1 on Global Motorsport', 'the-impact-of-f1-on-global-motorsport', 'Formula 1 has had a significant impact on global motorsport. This article discusses how F1 has influenced other racing series and the motorsport industry as a whole.', 'Business', '/images/placeholder-4.webp');
        `)

		console.log('Articles seeded successfully')
	} catch (error) {
		console.error('Error seeding articles:', error)
	} finally {
		db.end()
	}
}

export default seedArticles
