// "use client"

export const timeline = [
    {
        id: "1",
        owner: { id: "1", name: "Google INC.", verified: true },
        type: "single",
        image: false,
        sponsored: false,
        showResult: "after",
        title: "Who will win the United states presidential election in 2024?",
        options: [
            { text: "Joe Biden", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 6500 },
            { text: "Donald Trump", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 35000 },
            { text: "Kamala Harris", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 8000 },
            { text: "Peter Obi", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 855 },
        ],
        votes: 50355
    },
    {
        id: "2",
        owner: { id: "1", name: "Google INC.", verified: true },
        type: "single",
        image: true,
        sponsored: true,
        showResult: "before",
        title: "Who will win the United states presidential election in 2024?",
        options: [
            { text: "Joe Biden", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 6500 },
            { text: "Donald Trump", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 35000 },
            { text: "Kamala Harris", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 8000 },
            { text: "Peter Obi", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 855 },
        ],
        votes: 50355
    },
    {
        id: "3",
        owner: { id: "1", name: "Google INC.", verified: true },
        type: "single",
        image: false,
        sponsored: false,
        showResult: "before",
        title: "Who will win the United states presidential election in 2024?",
        options: [
            { text: "Joe Biden", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 6500 },
            { text: "Donald Trump", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 35000 },
            { text: "Kamala Harris", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 8000 },
            { text: "Peter Obi", image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", votes: 855 },
        ],
        votes: 50355
    }
]

export const JoinReason = [
    {
        icon: "💪",
        voter: true,
        title: "Completely free",
        description: "Whether you're voting, creating polls, or analyzing data, it’s 100% free to use.",
    },
    {
        icon: "📊",
        voter: true,
        title: "Instant insights",
        description: "Businesses and analysts get real-time public opinions to make data-driven decisions fast.",
    },
    {
        icon: "🌎",
        voter: true,
        title: "Active community",
        description: "Join thousands of users voting on sports, politics, entertainment, and more.",
    },
    {
        icon: "🏆",
        voter: true,
        title: "Business Growth",
        description: "Brands use ReaPoll to understand customers and improve products based on real opinions.",
    },
    {
        icon: "🔥",
        voter: true,
        title: "Trending topics",
        description: "Stay updated with what’s buzzing in news, culture, technology and the latest conversations.",
    },
    {
        icon: "💰",
        voter: true,
        title: "Instant rewards for voting",
        description: "Reap instant rewards by voting on fun and trendy topics including business and politics",
    }
]

export const QA = [
    {
        question: "Is Reapoll free to use?",
        answer: "Yes, Reappoll is free for both voters and poll creators. Some advanced features for creators may require a paid plan."
    },
    {
        question: "How do I earn rewards on Reappoll?",
        answer: "You earn rewards by voting on polls. Each vote earns you points, which can be redeemed for cash, gift cards, or exclusive perks."
    },
    {
        question: "Can I see who voted on my poll?",
        answer: "No, voter identities are kept private to protect their privacy. However, you’ll get detailed analytics on voter demographics and trends."
    },
    {
        question: "Can I promote my poll outside Reappoll?",
        answer: "Yes! Share your poll’s unique link on social media, email, or anywhere else to attract more voters."
    },
    {
        question: "How does Reappoll protect my data?",
        answer: "We use industry-standard encryption and never sell your data. Your privacy and security are our top priorities."
    },
    {
        question: "Can I vote on polls anonymously?",
        answer: "Yes, your votes are private. We never share your personal information or voting history."
    },
    {
        question: "How often are new polls added?",
        answer: "New polls are added every hour, so there’s always something new to vote on!"
    },
]

export const SideBarLinks = [
    {
        label: "Overview",
        href: "/dashboard",
        active: true
    },
    {
        label: "Polls",
        href: "/dashboard/polls",
        active: false
    },
    {
        label: "Votes",
        href: "/dashboard/votes",
        active: false
    },
    {
        label: "Tasks",
        href: "/dashboard/tasks",
        active: false
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        active: false
    }
]