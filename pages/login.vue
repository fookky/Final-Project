<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card ref="form">
        <v-card-title class="headline">
          Login
        </v-card-title>
        <v-card-text>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-text-field
              v-model="email"
              :rules="[rules.email]"
              color="deep-purple"
              label="Email"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[rules.password]"
              color="deep-purple"
              label="Password"
              style="min-height: 96px"
            ></v-text-field>
              <a
                :href="'/forgotpassword/'"
                class="text-decoration-none"
              >
                Forgot Password
              </a>
              </br>
              <a
                :href="'/register/'"
                class="text-decoration-none"
              >
                Register
              </a>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" nuxt to="/inspire"> Confirm </v-btn>
            </v-card-actions>
          </v-form>
          <!-- <hr class="my-3" /> -->
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    email: undefined,
    password: undefined,
    rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      required: v => !!v || 'This field is required',
    },
}),
}
</script>
