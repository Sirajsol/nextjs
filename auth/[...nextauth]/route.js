// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials"
// import prisma from '../../../../utils/pris'
// // import {authOptions}  from './authoptions'





// export const handler=new NextAuth({
//     providers:[
//         CredentialsProvider({
//             id:'credentials',
//             name:'credentials',
//             credentials:{
//               name:{
//                 label:"name",
//                 type:"text"
//               },
//               password:{
//                 label:"password",
//                 type:"password"
//               },
      
      
//             },
//             async authorize(credentials) {
              
//         console.log('inside autho')
//         if(!credentials?.name || !credentials?.password){
//             console.log('no user or password')
//           throw new Error('not found email or password')
//         }
        
//         const user =await prisma.mUser.findUnique(
//          {where:{
//           name:credentials.name
//         }} 
//         )
//         console.log(user)
//         if(!user || !user?.password){
//           throw new Error('no user invalid email or password')
//         }
//         // const isCorrectPassowrd= await bcrypt.compare(
//         //   credentials.password,  //the password the user enter
//         //   user.hashedPassword   // the hashed password
//         // )
        
//         const isCorrectPassowrd=(credentials.password==user.password)
//         console.log("is correct ",isCorrectPassowrd)
//         if(!isCorrectPassowrd){
//           console.log(credentials.password)
//           throw new Error('not correct invalid email or password')
//         }
//         console.log("to the end")
//         return user
//       }
//           })
//     ]
// })
// export {handler as GET, handler as POST}

