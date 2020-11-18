import axios from 'axios'
import _default from 'apisauce';

import { combineDates, calculatePercentChange } from "./stockUtils";


const firebaseAxios = axios.create({ baseURL: "https://us-central1-finary-1729.cloudfunctions.net/api" });


// getpostforuser gets all posts for a different user


const login = async (email, password) => {
    const body = {
        email: email,
        password: password
    }
    const loginResponse = await firebaseAxios.post("/login", body)
    return loginResponse
}

const signUp = async (email, password) => {
    const body = {
        email: email,
        password: password
    }
    const signUpResponse = await firebaseAxios.post("/signUp", body)
    return signUpResponse
}

const getAlpacaToken = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };

    const alpacatokenResponse = await firebaseAxios.get("/alpacaApiToken", config)
    return alpacatokenResponse
}

const exhangeAlpacaToken = async (code) => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const body = {
        code: code
    }
    const alpacaToken = await firebaseAxios.post("/alpacaApiGetToken", body, config)
    return alpacaToken
}

const onBoarding = async (alpacaToken) => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const body = {
        firstName: "Raj",
        lastName: "Chhatbar",
        phoneNo: "6575009851",
        birthDate: "1996-06-26",
        immigrationStatus: "student",
        employmentDetail: "self",
        addressStreet: "2404 Nutwood",
        addressApt: "G37",
        addressZip: "92831",
        addressCity: "Fullerton",
        addressState: "CA",
        username: sessionStorage.getItem("email"),
        biography: "",
        shareGraph: true,
        shareWatchlist: true,
        shareTrade: true,
        groups: [],
        investmentGoal: "grow",
        investmentExperience: "2",
        investmentAmount: "5000",
        investmentRiskLevel: "low",
        alpacaApiToken: alpacaToken
    }
    const onBoardingResponse = await firebaseAxios.post("/onboarding", body, config)
    return onBoardingResponse
}


const checkLogin = async () => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    try {
        const loggedIn = await firebaseAxios.get("/checkValidCookie", config)
        return loggedIn
    } catch {
        return { status: 403 }
    }
}

const getProfile = async (username) => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const profile = await firebaseAxios.get(`/getProfile?username=`  + username, config)
    return profile
}


const getPortfolioPerformance = async () => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const portfolio = await firebaseAxios.get(`/alpacaApiGetPortfolio?timeframe=1D&period=1A`, config)
    portfolio.combinedDates = combineDates(portfolio.data.timestamp, portfolio.data.equity)
    portfolio.portfolioChange = calculatePercentChange(portfolio.data.base_value, portfolio.combinedDates)
    return portfolio
}


const getUserWatchlist = async () => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const watchlist = await firebaseAxios.get(`/alpacaApiGetWatchListName`, config)
    return watchlist
}

const getActiveGroups = async () => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const groups = await firebaseAxios.get(`/groupTrendingDetails`, config)
    return groups
}

const getActiveGroupNames = async () => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const groups = await firebaseAxios.get(`/groupForUser`, config)
    return groups
}

const getGroupDetails = async (groupName) => {
    const token = sessionStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const groups = await firebaseAxios.get(`/groupDetails?group=${groupName}`, config)
    return groups
}

const joinGroup = async (group) => {
    const token = sessionStorage.getItem("token")
    const body = {
        group: group,
    }

    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const joinedGroup = await firebaseAxios.post(`/joinGroup`, body, config)
    return joinedGroup
}


const leaveGroup = async (group) => {
    const token = sessionStorage.getItem("token")
    const body = {
        group: group,
    }

    const config = {
        headers: { Authorization: `Bearer ${token}`, mode: "no-cors", 'Access-Control-Allow-Origin': "*" }
    };
    const leaveGroup = await firebaseAxios.post(`/leaveGroup`, body, config)
    return leaveGroup
}

const getComments = async (postID) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const comments = await firebaseAxios.get(`/commentFromPost?postId=${postID}`, headers)
    return comments
}

const getPosts = async (group, sorting) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let posts
    if (sorting === "new") {
        posts = await firebaseAxios.get(`/postFromSpecificGroupTimeBased?group=${group}`, headers)
    } else {
        posts = await firebaseAxios.get(`/postFromSpecificGroupHotScore?group=${group}`, headers)
    }

    return posts
}

const getStockPosts = async (stockSymbol) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const posts = await firebaseAxios.get(`/postFromStockTimeBased?stock=${stockSymbol}`, headers)
    return posts
}

const getUserPortfolioPosts = async (sorting) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let posts
    if (sorting === "new") {
        posts = await firebaseAxios.get(`postTrendingFromGroupTimeBased`, headers)
    } else {
        posts = await firebaseAxios.get(`/postTrendingFromGroupHotScoreBased`, headers)
    }
    return posts
}


const createPost = async (group, title, description) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const body = {
        group: group,
        title: title,
        description: description
    }
    const newPost = await firebaseAxios.post(`/createPost`, body, headers)
    return newPost
}


const deletePost = async (postID) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const body = {
        postId: postID
    }
    const deletePost = await firebaseAxios.delete(`/deletePost`, {
        headers: { Authorization: "Bearer " + token },
        data: {
            postId: postID
        }
    })
    return deletePost
}


const createComment = async (postID, comment) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const body = {
        postId: postID,
        comment: comment,
    }
    const newComment = await firebaseAxios.post(`/createComment`, body, headers)
    return newComment
}

const createStockPost = async (stockSymbol, title, description, stockPriceBought, stockPriceSold, quantity, side,  ) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const body = {
        stock: stockSymbol,
        title: title,
        stockTradeType : side,
        description: description,
        stockPriceBought: stockPriceBought,
        stockPriceSold : stockPriceSold,
        stockCount: quantity,
        stockBoughtTime: Date.now()
    }

    const newPost = await firebaseAxios.post(`/createStockPost`, body, headers)
    return newPost
}

const createStockComment = async (stockSymbol, comment) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const body = {
        stock: stockSymbol,
        stockComment: comment,
    }
    const newComment = await firebaseAxios.post(`/createPost`, body, headers)
    return newComment
}


const createUpVote = async (postID) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const body = {
        postId: postID
    }
    const newUpVote = await firebaseAxios.post(`/createUpVote`, body, headers)
    return newUpVote
}


const removeUpVote = async (postID) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const body = {
        postId: postID
    }

    const newUpVote = await firebaseAxios.post(`/removeUpVote`, body, headers)
    return newUpVote
}



const createDownVote = async (postID) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const body = {
        postId: postID
    }

    const newDownVote = await firebaseAxios.post(`/createDownVote`, body, headers)
    return newDownVote
}

const removeDownVote = async (postID) => {
    const token = sessionStorage.getItem("token")
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const body = {
        postId: postID
    }

    const newDownVote = await firebaseAxios.post(`/removeDownVote`, body, headers)
    return newDownVote
}



export {
    login,
    signUp,
    onBoarding,
    checkLogin,
    getProfile,
    getPortfolioPerformance,
    getUserWatchlist,
    getActiveGroups,
    getPosts,
    getStockPosts,
    createPost,
    deletePost,
    createStockComment,
    createStockPost,
    createDownVote,
    createUpVote,
    removeUpVote,
    createComment,
    getUserPortfolioPosts,
    joinGroup,
    getGroupDetails,
    removeDownVote,
    getComments,
    getActiveGroupNames,
    getAlpacaToken,
    exhangeAlpacaToken,
    leaveGroup
}