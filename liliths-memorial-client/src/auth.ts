import NextAuth from "next-auth"
import Authentik from "next-auth/providers/authentik"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Authentik({
    wellKnown: "http://trueducks.de:9000/application/o/liliths-memorial/.well-known/openid-configuration",
    issuer: "http://trueducks.de:9000/application/o/liliths-memorial/",
    authorization: "http://trueducks.de:9000/application/o/authorize/"
  })]
})