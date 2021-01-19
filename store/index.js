import gql from "graphql-tag";


export const state = () => ({
    dialog: false,
    info: {
        name: "",
        showContacts: false,
    },
    // contacts: {
    //     phone: "+79057655115",
    //     email: "bestadforyou5115@gmail.com"
    // },
    ads: []
})



export const mutations = {
    dialog(state, item) {
        state.dialog = item
    },
    SET_AD(state, item) {
        state.ads = item
    },
    SET_INFO(state, item) {
        state.info = item
    }
}

export const actions = {
    async nuxtServerInit(state, { app }) {
        const client = app.apolloProvider.defaultClient;
        const query = gql`
            query MainQuery{
                advertisements{
                    companyName
                    startX
                    endY
                    endX
                    startY
                    link
                    img{
                    url
                    }
                }
                info{
                    phone
                    mail
                    name
                    logo{
                        url
                    }
                    showContacts
                    footerText
                }
            }
        `
        const { data } = await client.query({
            query
        })
        state.commit('SET_AD', data.advertisements)
        state.commit('SET_INFO', data.info)
        // console.log("🚀 ~ file: index.js ~ line 59 ~ nuxtServerInit ~ dataGraph", data)
    },
    // async storeDispatchFunc({ commit }) {

    // },
    toggleDialog(ctx, data) {
        ctx.commit("dialog", data)
    }
}