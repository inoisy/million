

export const state = () => ({
    dialog: false,
    info: {
        name: "1MDollar.com"
    },
    contacts: {
        phone: "+79057655115",
        email: "bestadforyou5115@gmail.com"
    }
})



export const mutations = {
    dialog(state, item) {
        state.dialog = item
    },
}

export const actions = {
    toggleDialog(ctx, data) {
        ctx.commit("dialog", data)
    }
}