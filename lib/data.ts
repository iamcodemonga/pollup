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
        answer: "Yes, Reappoll is free for both voters and poll creators. Some advanced features for creators may require a pro plan."
    },
    {
        question: "How do I earn rewards on Reappoll?",
        answer: "You earn rewards by voting on polls. Each vote earns you credits, which can be redeemed for cash or exclusive perks."
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

export const tasks = [
    { 
        id: "1",
        type: "signup",
        title: "Signup",
        description: "Kickstart your journey with Reappoll by creating a new account.",
        reward: 10000,
        completed: true
    },
    { 
        id: "2",
        type: "profile",
        title: "Complete Profile",
        description: "Complete your profile details and start reaping rewards instantly.",
        reward: 10000,
        completed: false
    },
    // { 
    //     id: "3",
    //     type: "video",
    //     title: "Watch Video",
    //     description: "Get familiar with Reappoll by watching a quick introductory video.",
    //     reward: 10000,
    //     completed: false
    // },
    { 
        id: "3",
        type: "poll",
        title: "Create your first poll",
        description: "Craft your poll, gather opinions and get realtime results from real people.",
        reward: 10000,
        completed: false
    },
    { 
        id: "4",
        type: "referral",
        title: "Refer a friend",
        description: "Invite friends and get rewarded for every successful referral.",
        reward: 10000,
        completed: false
    }
]

export const milestones = [
    { 
        id: "1",
        type: "100v",
        title: "Get 100 Votes",
        description: "Gather 100 votes from active registered users on any of your polls.",
        reward: 10000,
        completed: false
    },
    { 
        id: "2",
        type: "200v",
        title: "Get 200 Votes",
        description: "Gather 200 votes from active registered users on any of your polls.",
        reward: 10000,
        completed: false
    },
    { 
        id: "3",
        type: "500v",
        title: "Get 500 Votes",
        description: "Gather 500 votes from active registered users on any of your polls.",
        reward: 10000,
        completed: false
    },
    { 
        id: "4",
        type: "1000v",
        title: "Get 1,000 Votes",
        description: "Gather 1,000 votes from active registered users on any of your polls.",
        reward: 20000,
        completed: false
    },
    { 
        id: "5",
        type: "2000v",
        title: "Get 2,000 Votes",
        description: "Gather 2,000 votes from active registered users on any of your polls.",
        reward: 20000,
        completed: false
    },
    { 
        id: "6",
        type: "5000v",
        title: "Get 5,000 Votes",
        description: "Gather 5,000 votes from active registered users on any of your polls.",
        reward: 20000,
        completed: false
    },
    { 
        id: "7",
        type: "10000v",
        title: "Get 10,000 Votes",
        description: "Gather 10,000 votes from active registered users on any of your polls.",
        reward: 50000,
        completed: false
    },
    { 
        id: "8",
        type: "100000v",
        title: "Get 100,000 Votes",
        description: "Gather 100,000 votes from active registered users on any of your polls.",
        reward: 100000,
        completed: false
    },
]