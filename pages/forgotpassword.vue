
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Change Password </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="newpassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'newpassword'"
              @click:append="show1 = !show1"
              :rules="[rules.newpassword]"
              color="deep-purple"
              label="New Password"
              style="min-height: 96px"
            ></v-text-field>

            <v-text-field
              v-model="confirmpassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'confirmpassword'"
              @click:append="show2 = !show2"
              :rules="[rules.confirmpassword]"
              color="deep-purple"
              label="Confirm Password"
              style="min-height: 96px"
            ></v-text-field>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" nuxt to="/inspire"> Confirm </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    show2: false,
    email: undefined,
    password: undefined,
    confirmpassword: undefined,
    rules: {
      password: (v) =>
        !!(v || '').match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      confirmpassword: (v) =>
        !!(v || '').match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      required: (v) => !!v || 'This field is required',
    },
  }),
}
</script>
