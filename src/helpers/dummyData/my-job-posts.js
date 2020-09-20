const MyJobPosts = [
    {
        id: 4,
        title: "React Native Developer",
        objective: "Join us to create our new iOS and Android applications. You will be part of the definition and implementation of this challenging project from its ground up..",
        budget: 4400,
        date: "4th June 2020",
        keywords: ["React", "Design", "Android"],
        Location: 'San Fransisco',
        visibility: 1,
        status: 1,
        comments: [
            {
                author: 'jake blue',
                date: '19th May 2019',
                comment: 'interesting job post',
                replies: [
                    {
                        author: 'jake blue',
                        date: '19th May 2019',
                        comment: 'interesting job post For example, branded job postings tend to get more attention, and postings that ... The most engaging and interesting content should fall above the fold to',
                    }
                ]
            },
            {
                author: 'john doe',
                date: '01 April  2020',
                comment: 'interesting job post',
            },
        ],
        bids: [{
            user: 'David P.',
            date: '06 June 2019',
            type: 'request'
        },{
            user: 'David M.',
            date: '12 April 2020',
            note: 'I’m an innovative software engineer with 20 years of experience managing all aspects of the development process for small to medium-sized companies.',
            amount: 700,
            type: 'bid',
            is_accepted: false,
        },{
            user: 'Kuba A.',
            email: 'Kuba Adam@gmail.com',
            date: '04 November 2020',
            note: 'My last job was at Sephora, where I was in charge of the West Coast marketing team. We designed customer attraction and retention plans beginning from the market research stage. Our 2017 goal was a 2% revenue increase over 2016 and we got 3%.',
            amount: 100,
            type: 'bid',
            is_accepted: true,
        }],
    },
    {
        id: 5,
        title: "Banking software development",
        objective: "Leverage existing technology solutions to create scalable banking application.banking app. Choose reliable data storage. Don't store sensitive data, passwords, and transaction-related information on the device.",
        budget: 4500,
        date: "10th April 2020",
        keywords: ["android", "mobile apps", "programming"],
        Location: 'Florida',
        visibility: 2,
        status: 2,
        comments: [
            {
                author: 'jake blue',
                date: '19th May 2019',
                comment: 'interesting job post',
            },
            {
                author: 'john doe',
                date: '01 April  2020',
                comment: 'interesting job post',
            },
        ],
        bids: [{
            user: 'David P.',
            date: '06 June 2019',
            type: 'request'
        },{
            user: 'David M.',
            date: '12 April 2020',
            note: 'I’m an innovative software engineer with 20 years of experience managing all aspects of the development process for small to medium-sized companies.',
            amount: 100,
            type: 'bid',
            is_accepted: false,
        },{
            user: 'Kuba A.',
            email: 'Kuba Adam@gmail.com',
            date: '04 November 2020',
            note: 'My last job was at Sephora, where I was in charge of the West Coast marketing team. We designed customer attraction and retention plans beginning from the market research stage. Our 2017 goal was a 2% revenue increase over 2016 and we got 3%.',
            amount: 100,
            type: 'bid',
            is_accepted: true,
        }],
    },
    {
        id: 6,
        title: "iOS app design",
        objective: "Seeking ui/ux app designer to put together prototype of an application in the next 1-2 weeks. Must have iOS design experience and sign company NDA. Please submit a link to your portfolio and explain your process (e.g. what you need from us).",
        budget: 2600,
        date: "19th May 2020",
        keywords: ["ios", "android", "API"],
        Location: 'Miami',
        visibility: 1,
        status: 1,
        comments: [
            {
                author: 'jake blue',
                date: '19th May 2019',
                comment: 'interesting job post',
            },
            {
                author: 'john doe',
                date: '01 April  2020',
                comment: 'interesting job post',
            },
        ],
        bids: [{
            user: 'David P.',
            date: '06 June 2019',
            type: 'request'
        },{
            user: 'David M.',
            date: '12 April 2020',
            note: 'I’m an innovative software engineer with 20 years of experience managing all aspects of the development process for small to medium-sized companies.',
            amount: 100,
            type: 'bid',
            is_accepted: false,
        },{
            user: 'Kuba A.',
            email: 'Kuba Adam@gmail.com',
            date: '04 November 2020',
            note: 'My last job was at Sephora, where I was in charge of the West Coast marketing team. We designed customer attraction and retention plans beginning from the market research stage. Our 2017 goal was a 2% revenue increase over 2016 and we got 3%.',
            amount: 100,
            type: 'bid',
            is_accepted: true,
        }],
    },
]

export default MyJobPosts;