
<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">

      <v-card ref="form">
        <v-card-title class="headline"> Register </v-card-title>
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="form.name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            ref="lastname"
            v-model="form.lastname"
            :rules="[() => !!lastname || 'This field is required']"
            :error-messages="errorMessages"
            label="Last Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            :rules="[rules.email]"
            color="deep-purple"
            label="Email"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            :rules="[rules.password]"
            color="deep-purple"
            label="Password"
            style="min-height: 96px"
          ></v-text-field>
          <v-text-field
            v-model="form.confirmpassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'confirmpassword'"
            @click:append="show2 = !show2"
            :rules="[rules.confirmpassword]"
            color="deep-purple"
            label="Confirm Password"
            style="min-height: 96px"
          ></v-text-field>
          <v-select
            v-model="form.status"
            :items="status"
            :rules="rules.statuss"
            color="pink"
            label="Status"
            required
          ></v-select>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    status: ['Student', 'Lecturer', 'Personnel'],
    errorMessages: '',
    name: null,
    lastname: null,
    email: null,
    password: null,
    confirmpassword: null,
    formHasErrors: false,

    show1: false,
    show2: false,
    rules: {
      email: (v) => !!(v || '').match(/@/) || 'Please enter a valid email',
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
      statuss: [(val) => (val || '').length > 0 || 'This field is required'],
    },
  }),
  computed: {
    form() {
      return {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        confirmpassword: this.confirmpassword,
        status: this.status,
      }
    },
  },

  watch: {
    name() {
      this.errorMessages = ''
    },
  },

  methods: {
    addressCheck() {
      this.errorMessages =
        this.lastname && !this.name ? `Hey! I'm required` : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })
    },
  },
}
</script>

<style scoped>
</style>