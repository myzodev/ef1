// DB connection will go here

const articles = [
    {
        id: 1,
        title: 'The Evolution of F1 Cars',
        text: 'From the early days of Formula 1 to the modern era, F1 cars have undergone significant changes in design, technology, and performance. This article explores the key milestones in the evolution of F1 cars.',
        category: 'Technology',
        image: '../images/placeholder-1.webp'
    },
    {
        id: 2,
        title: 'Top 10 F1 Drivers of All Time',
        text: 'Formula 1 has seen many legendary drivers over the years. This article ranks the top 10 F1 drivers of all time based on their achievements, skills, and impact on the sport.',
        category: 'History',
        image: '../images/placeholder-2.webp'
    },
    {
        id: 3,
        title: 'The Business of Formula 1',
        text: 'Formula 1 is not just a sport, but a global business. From sponsorship deals to broadcasting rights, the financial aspects of F1 play a crucial role in the sustainability and growth of the teams and the sport itself.',
        category: 'Business',
        image: '../images/placeholder-3.webp'
    },
    {
        id: 4,
        title: 'Women in Formula 1',
        text: 'Women have been making significant strides in Formula 1, both on and off the track. From drivers to engineers and team principals, women are increasingly playing vital roles in the sport.',
        category: 'Diversity',
        image: '../images/placeholder-4.webp'
    },
    {
        id: 5,
        title: 'The Impact of Weather on F1 Races',
        text: 'Weather conditions can have a dramatic impact on the outcome of a Formula 1 race. From rain-soaked tracks to extreme heat, teams must adapt their strategies to cope with the changing conditions.',
        category: 'Strategy',
        image: '../images/placeholder-1.webp'
    },
    {
        id: 6,
        title: 'The Role of Simulators in F1',
        text: 'Simulators have become an essential tool for Formula 1 teams. They allow drivers to practice and engineers to test new setups and strategies in a virtual environment, saving time and resources.',
        category: 'Technology',
        image: '../images/placeholder-2.webp'
    },
    {
        id: 7,
        title: 'The Legacy of Ayrton Senna',
        text: 'Ayrton Senna is widely regarded as one of the greatest drivers in Formula 1 history. His incredible talent, determination, and charisma left a lasting legacy on the sport and inspired countless fans and drivers.',
        category: 'History',
        image: '../images/placeholder-3.webp'
    },
    {
        id: 8,
        title: 'The Future of F1: Electric and Hybrid Technologies',
        text: 'As the world moves towards more sustainable energy sources, Formula 1 is also exploring electric and hybrid technologies. This article discusses the potential future of F1 with these advancements.',
        category: 'Technology',
        image: '../images/placeholder-4.webp'
    },
    {
        id: 9,
        title: 'The Most Memorable F1 Races',
        text: 'Formula 1 has had its fair share of unforgettable races. This article recounts some of the most thrilling and memorable races in F1 history.',
        category: 'History',
        image: '../images/placeholder-1.webp'
    },
    {
        id: 10,
        title: 'The Importance of Aerodynamics in F1',
        text: 'Aerodynamics plays a crucial role in the performance of F1 cars. This article explains the importance of aerodynamics and how teams optimize their cars for maximum efficiency.',
        category: 'Technology',
        image: '../images/placeholder-2.webp'
    },
    {
        id: 11,
        title: 'The Rise of Young F1 Drivers',
        text: 'In recent years, young drivers have been making a significant impact in Formula 1. This article highlights some of the rising stars in the sport and their journey to the top.',
        category: 'Profiles',
        image: '../images/placeholder-3.webp'
    },
    {
        id: 12,
        title: 'The Role of Strategy in F1',
        text: 'Strategy is a key component of success in Formula 1. This article delves into the various strategic elements that teams consider during a race, from tire choices to pit stop timings.',
        category: 'Strategy',
        image: '../images/placeholder-4.webp'
    },
    {
        id: 13,
        title: 'The Evolution of F1 Safety Measures',
        text: 'Safety has always been a top priority in Formula 1. This article explores the evolution of safety measures in the sport, from the introduction of the HANS device to the Halo system.',
        category: 'Safety',
        image: '../images/placeholder-1.webp'
    },
    {
        id: 14,
        title: 'The Impact of F1 on Automotive Technology',
        text: 'Many innovations in automotive technology have their roots in Formula 1. This article discusses how F1 has influenced the development of various technologies used in everyday cars.',
        category: 'Technology',
        image: '../images/placeholder-2.webp'
    },
    {
        id: 15,
        title: 'The Most Successful F1 Teams',
        text: 'Over the years, several teams have dominated the Formula 1 scene. This article looks at the most successful F1 teams and their contributions to the sport.',
        category: 'History',
        image: '../images/placeholder-3.webp'
    },
    {
        id: 16,
        title: 'The Role of Data Analysis in F1',
        text: 'Data analysis is a critical aspect of modern Formula 1. This article explains how teams use data to gain a competitive edge and improve their performance on the track.',
        category: 'Technology',
        image: '../images/placeholder-4.webp'
    },
    {
        id: 17,
        title: 'The Challenges of Hosting an F1 Race',
        text: 'Hosting a Formula 1 race is no small feat. This article explores the various challenges that organizers face, from logistics to ensuring the safety of drivers and spectators.',
        category: 'Business',
        image: '../images/placeholder-1.webp'
    },
    {
        id: 18,
        title: 'The Evolution of F1 Circuits',
        text: 'F1 circuits have evolved significantly over the years. This article takes a look at the changes in circuit design and how they have impacted the sport.',
        category: 'History',
        image: '../images/placeholder-2.webp'
    },
    {
        id: 19,
        title: 'The Role of Team Principals in F1',
        text: 'Team principals play a crucial role in the success of an F1 team. This article highlights the responsibilities of team principals and their impact on the sport.',
        category: 'Profiles',
        image: '../images/placeholder-3.webp'
    },
    {
        id: 20,
        title: 'The Impact of F1 on Global Motorsport',
        text: 'Formula 1 has had a significant impact on global motorsport. This article discusses how F1 has influenced other racing series and the motorsport industry as a whole.',
        category: 'Business',
        image: '../images/placeholder-4.webp'
    }
]

export default articles