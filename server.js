const express = require('express')
let env = require('dotenv').config({path: __dirname + '/.env'})
const axios = require('axios').default;
const bodyParser = require('body-parser')
const PORT = env.PORT || 3000

const app = express();
console.log('env',env.parsed)
let graphUri = env.graphUri
let access_token = env.access_token
let page_token   = env.page_token
let app_token = env.app_token

axios.interceptors.response.use((response)=>{
    return response.data
})

let url = 
`${graphUri}/me?access_token=${access_token}` //getUser
//`${graphUri}me/accounts?access_token=${access_token}` //getPages
//`${graphUri}me/accounts?access_token=${access_token}` //getPages
//`${graphUri}me/accounts?access_token=${access_token}` //getPages


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


let getUser = async ()=>{
 return await axios.get(`${graphUri}/me?access_token=${access_token}`);
}

let getPages = async ()=>{
    return await axios.get(`${graphUri}/me/accounts?access_token=${access_token}`)
}

let getPage = async (pageId, params)=>{
    console.log('pageId', pageId)
    return await axios.get(`${graphUri}/${pageId}?${params}&access_token=${access_token}`)
}
let getPagePosts = async (pageId)=>{
    console.log('pageId', pageId)
    return await axios.get(`${graphUri}/${pageId}/posts?access_token=${access_token}`)
}

let getPostComments = async (postId)=>{
    return await axios.get(`${graphUri}/${postId}/comments?access_token=${access_token}`)
}








/* GETTING THE DATA  */

let makeComment = async ()=>{
let user = await getUser()
let pages = await getPages()
let pageId = pages.data[0].id
 let page = await getPage(pageId, 'fields=about')
 let posts = await getPagePosts(pageId)
 let recentPostId = posts.data[0].id;
//  let comments = await getPostComments(recentPostId)

// console.log('user',user)
// console.log('page', page)


}





makeComment()


app.listen(PORT , ()=> console.log(`running on PORT: ${PORT}`))