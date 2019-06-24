<template>
  <span>
    <template v-if="type === 'image-regular' || type === 'image-circle'">
      <div class="file-input" :class="type">
        <div class="image-container">
          <img :src="imageRegular" v-if="type === 'image-regular'" title="" />
          <img :src="imageCircle" v-else title="" />
        </div>
        <div class="button-container">
          <md-button
            class="md-danger md-round"
            @click="removeImage"
            v-if="hasImage"
            ><i class="fa fa-times"></i>Remove</md-button
          >
          <md-button class="md-success md-round md-fileinput">
            <template v-if="type === 'image-regular' && !hasImage"
              >Select image</template
            >
            <template v-else-if="type === 'image-circle' && !hasImage"
              >Add photo</template
            >
            <template v-else
              >Change</template
            >
            <input type="file" :name="type" @change="onFileChange" />
          </md-button>
        </div>
      </div>
    </template>

    <template v-else-if="type === 'input'">
      <template v-if="!withButton">
        <md-field class="form-file-upload form-file-simple">
          <md-input
            v-model="inputModel"
            :id="inputName + 'Visible'"
            @click="triggerInputFileHidden(inputName + 'Hidden')"
            :placeholder="placeholder"
          ></md-input>
          <input
            type="file"
            :id="inputName + 'Hidden'"
            @change="newValue(inputName + 'Visible', inputName + 'Hidden')"
          />
        </md-field>
      </template>
      <template v-if="withButton">
        <div class="form-file-group">
          <md-field class="form-file-upload form-file-simple">
            <md-input
              v-model="inputModel"
              :id="inputName + 'Visible'"
              :multiple="multiple"
              @click="triggerInputFileHidden(inputName + 'Hidden')"
              :placeholder="placeholder"
            ></md-input>
            <input
              type="file"
              :id="inputName + 'Hidden'"
              @change="newValue(inputName + 'Visible', inputName + 'Hidden')"
              v-if="!multiple"
            />
            <input
              type="file"
              :id="inputName + 'Hidden'"
              :multiple="multiple"
              @change="
                newValueMultiple(inputName + 'Visible', inputName + 'Hidden')
              "
              v-else
            />
          </md-field>
          <md-button
            class="md-success md-round md-just-icon"
            @click="triggerInputFileHidden(inputName + 'Hidden')"
            ><md-icon>{{ btnIcon }}</md-icon></md-button
          >
        </div>
      </template>
    </template>
  </span>
</template>

<script>
export default {
  name: "file-upload",
  props: {
    type: String,
    inputName: String,
    inputValue: String,
    placeholder: String,
    multiple: Boolean,
    btnIcon: String,
    withButton: Boolean
  },
  data() {
    return {
      inputModel: null,
      inputModel2: null,
      imageRegular: require("@/assets/img/image_placeholder.jpg"),
      imageCircle: require("@/assets/img/placeholder.jpg"),
      hasImage: false
    };
  },
  methods: {
    onFileChange(e) {
      e.preventDefault();
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      let vm = this;
      reader.onload = () => {
        if (this.type === "image-circle") {
          vm.imageCircle = reader.result;
        } else {
          vm.imageRegular = reader.result;
        }
      };
      reader.readAsDataURL(file);
      vm.hasImage = true;
    },
    removeImage: function() {
      if (this.type === "image-circle") {
        this.imageCircle = require("@/assets/img/placeholder.jpg");
      } else {
        this.imageRegular = require("@/assets/img/image_placeholder.jpg");
      }
      this.hasImage = false;
    },
    triggerInputFileHidden(hiddenID) {
      let element = document.getElementById(hiddenID);
      element.click();
    },
    newValue(visibleID, hiddenID) {
      let element = document.getElementById(hiddenID);
      let visibleElem = document.getElementById(visibleID);
      let elemValue = element.value;
      let filename = elemValue.replace(/C:\\fakepath\\/i, "");

      visibleElem.value = filename;
    },
    newValueMultiple(visibleID, hiddenID) {
      let element = document.getElementById(hiddenID);
      let visibleElem = document.getElementById(visibleID);
      let names = "";
      for (var i = 0; i < element.files.length; ++i) {
        if (i < element.files.length - 1) {
          names += element.files.item(i).name + ", ";
        } else {
          names += element.files.item(i).name;
        }
      }

      visibleElem.value = names;
    }
  }
};
</script>

<style lang="css"></style>
