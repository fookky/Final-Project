<template>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >
      <v-card>
        <v-snackbar
          v-model="snackbar"
          absolute
          top
          right
          color="success"
        >
          <span>Registration successful!</span>
          <v-icon dark>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-snackbar>
        <v-form
          ref="form"
          @submit.prevent="submit"
        >
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="form.first"
                  :rules="rules.name"
                  color="purple darken-2"
                  label="First name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="form.last"
                  :rules="rules.name"
                  color="blue darken-2"
                  label="Last name"
                  required
                ></v-text-field>
              </v-col>


              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="form.favoriteAnimal"
                  :items="animals"
                  :rules="rules.animal"
                  color="pink"
                  label="Favorite animal"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="form.terms"
                  color="green"
                >
                  <template v-slot:label>
                    <div @click.stop="">
                      Do you accept the
                      <a
                        href="#"
                        @click.prevent="terms = true"
                      >terms</a>
                      and
                      <a
                        href="#"
                        @click.prevent="conditions = true"
                      >conditions?</a>
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn
              text
              @click="resetForm"
            >
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!formIsValid"
              text
              color="primary"
              type="submit"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-form>
        <v-dialog
          v-model="terms"
          width="70%"
        >
          <v-card>
            <v-card-title class="text-h6">
              Terms
            </v-card-title>
            <v-card-text
              v-for="n in 5"
              :key="n"
            >
              {{ content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="purple"
                @click="terms = false"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="conditions"
          width="70%"
        >
          <v-card>
            <v-card-title class="text-h6">
              Conditions
            </v-card-title>
            <v-card-text
              v-for="n in 5"
              :key="n"
            >
              {{ content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="purple"
                @click="conditions = false"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>


      <v-card ref="form">
        <v-card-title class="headline">
          Register
        </v-card-title>
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="form.name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Full Name"
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
          <v-btn text>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
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
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            Submit
          </v-btn>
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
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      confirmpassword: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      required: v => !!v || 'This field is required',
      statuss: [val => (val || '').length > 0 || 'This field is required'],
      },
  }),
  computed: {
      form () {
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
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      addressCheck () {
        this.errorMessages = this.lastname && !this.name
          ? `Hey! I'm required`
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
    },
}
</script>

<style>

</style>