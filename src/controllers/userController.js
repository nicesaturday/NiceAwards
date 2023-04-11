import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getLogin = (req,res) => {
    return res.render("login",{pageTitle:"login"});
}

export const postLogin = async (req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
        return res.status(400).render("login",{pageTitle: "login",errorMessage:"일치하는 username이 없거나 비밀번호가 일치하지 않습니다."})
    }
    const ok = await bcrypt.compare(password,user.password);
    if (!ok) {
        return res.status(400).render("login",{pageTitle: "login",errorMessage:"일치하는 username이 없거나 비밀번호가 일치하지 않습니다."})
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const getJoin = (req,res) => {
    return res.render("join", {pageTitle: "join"});
}

export const postJoin = async (req,res) => {
    const {username,password,password2,name,email,location} = req.body;
    const usernameExists = await User.exists({username})
    if (usernameExists) {
        return res.status(400).render("login",{pageTitle:"login", errorMessage:"이미 다른 사용자가 사용중인 name 입니다."});
    }
    const emailExists = await User.exists({email})
    if (emailExists) {
        return res.status(400).render("login",{pageTitle:"login", errorMessage:"이미 다른 사용자가 사용중인 email 입니다."});
    }
    if (password !== password2){
        return res.status(400).render("login",{pageTitle:"login", errorMessage:"비밀번호가 일치하지 않습니다."});
    }
    try{
    await User.create({
        username,
        password,
        name,
        email,
        location
    })
}catch{
    return res.status(400).render("/login", {pageTitle: "Login" , errorMessage: error._message}); 
}
    return res.redirect("/login");
}

export const startGithubLogin = (req,res) => {
    const baseURL = "https://github.com/login/oauth/authorize";
    const config = {
        client_id : process.env.GH_CLIENT,
        allow_signup:false,
        scope:"read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    return res.redirect(finalURL);
}

export const finishGithubLogin = async (req,res) => {
    const baseURL = "https://github.com/login/oauth/access_token";
    const config = {
        client_id : process.env.GH_CLIENT,
        client_secret : process.env.GH_SECRET,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    const tokenRequest = await (await fetch(finalURL,{
        method:"POST",
        headers: {
            Accept: "application/json",
        }
    })).json();
    if("access_token" in tokenRequest ) {
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (await fetch(`${apiUrl}/user`,{
            method : "GET",
            headers:{
                Authorization: `token ${access_token}`
            }
        })).json();
        const emailData = await(await fetch(`${apiUrl}/user/emails`,{
            headers : {
                Authorization: `token ${access_token}`
            }
        })).json();
        const emailObj = emailData.find(e => e.primary && e.verified === true )
        if(!emailObj){
            return res.redirect("/login");
        }
        let user = await User.findOne({email:emailObj.email});
        if(!user){
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly:true,
                location: userData.location,
            })  
        }      
            console.log(user)
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
    }else {
        return res.redirect("/login");
    }
}

export const logout = (req,res) => {
    req.session.destroy();
    return res.redirect("/");
}
export const profile = async (req,res) => {
    const {id} = req.params
    const user = await User.find({_id:id});
    return res.render("profile", {pageTitle: "profile", user})
}

export const editGetProfile = async (req,res) => {
    return res.render("profileEdit", {pageTitle:"profileEdit"})
}

export const editPostProfile = async (req,res) => {
    const {_id} = req.session.user;
    const sessionUsername = req.session.user.username;
    const sessionName = req.session.user.name;
    const sessionEmail = req.session.user.email;
    const {username,name,location,email} = req.body;
    if(sessionUsername !== username) {
        const exists = await User.exists({username});
        if (exists) {
            return res.status(400).render("profileEdit",{pageTitle:"ProfileEdit",errorMessage:"이미 존재하는 username입니다."})
        }
        await User.findByIdAndUpdate(_id,{username},{new:true})
    }
    else if (sessionName !== name) {
        const exists = await User.exists({name});
        if (exists) {
            return res.status(400).render("profileEdit",{pageTitle:"ProfileEdit",errorMessage:"이미 존재하는 name입니다."})
        }
        await User.findByIdAndUpdate(_id,{name},{new:true})
    }
    else if (sessionEmail !== email) {
        const exists = await User.exists({email});
        if (exists) {
            return res.status(400).render("profileEdit",{pageTitle:"ProfileEdit",errorMessage:"이미 존재하는 email입니다."})
        }
        await User.findByIdAndUpdate(_id,{email},{new:true})
    } else{
    await User.findByIdAndUpdate(_id,{location},{new:true})
    }
    return res.redirect("/");
}