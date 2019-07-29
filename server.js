const express = require('express')
const axios = require('axios').default;
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;

const app = express();


let graphUri = `https://graph.facebook.com`
let access_token = 'EAAG1vC6Gl6cBAOwZA7ew5fYX4jpVPgcoHlESjri4MVzfYgB7bvqWsdwVZCDvONSVhcdqpA3M3vgKNmXtAZBvnbNPjLESvZCZAdQnTZC53YFmABRo1HE4ZBZBCLjgRwZAsqqIggVKqegWRMUyBZAbq8jJB1t9d9IKEEMRlQ5CkszZBZCWIRICOqy3z8qCBtarOTw8WVnYhZAp73uD7KgZDZD'
let page_token   = 'EAAG1vC6Gl6cBAN76ucHyFedeEm2idJDdxtMIziPo0fpCT5ogNVYKDrcgnN9vWsVY4EE3J7tyWZB5azdDSanVTMrrSNldTdtxBo7H8zulm23tTFDHcZBKoK7njJGEIeDeQQsRViD5TbXCbp4pKEbGJ1OYZAzCprHTZAephm9tX6dVpcPNmRJbAqMPrxJ12BQUSfdecQQfegZDZD'
let app_token = '481294815762343|XSkVb_XZV0wvrK4nkEFrZFWBHio'


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
 let comments = await getPostComments(recentPostId)

// console.log('user',user)
// console.log('page', page)

console.log(comments)
}





makeComment()


app.listen(PORT , ()=> console.log(`running on PORT: ${PORT}`))