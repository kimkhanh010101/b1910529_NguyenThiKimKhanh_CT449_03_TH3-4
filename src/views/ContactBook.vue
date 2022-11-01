<template>
    <div class="col-md-10">
        <InputSearch v-model="searchText" />

    </div>
    <div class="mt-3 col-md6">
        <h4>
            Danh bạ
            <i class="fas fa-address-book"></i>

        </h4>
        <ContactList v-if="filteredContactsCount > 0" :Contacts="filteredContacts" v-model:activeIndex="activeIndex" />
        <p v-else>Không có liên hệ nào.</p>

        <div class="mt-3 row justify-content-around align-items-center">
            <button class="btn btn-sm btn-primary" @click="refreshList()">
            </button>
            <button class="btn btn-sm btn-success" @click="goToAddContact">
                <i class="fas fa-plus"></i>Thêm mới
            </button>
            <button class="btn btn-sm btn-danger" @click="removeAllContacts">
                <i class="fas fa-trash"></i>Xóa tất cả
            </button>
        </div>
    </div>
    <div class="mt-3 col-md-6">
        <div v-if="activeContact">
            <h4>
                Chi tiết liên hệ
                <i class="fas fa-address-card"></i>
                
                </h4>
                <ContactCard :contact="activeContact" />
                
                <router-link :to="{
                name: 'contact.edit',
                params: { id: activeContact._id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
        </div>
    </div>

</template>
<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/componenrs/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";


export default {
    components: {
        contactCard,
        InoutSearch,
        ContactList,
    },
    data() {
        return {
            contacts: [],
            activeIndex: -1,
            searchText: "",

        };
    },
    watch: {
        //Giám sát những thay đổi của biến searchText.
        // Bỏ chọn các phần tử ddabf được chon trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        //Chuyển các đối tượng contact thành chuỗi để tiết kiệm cho tìm kiếm.
        contactStrings() {
            return this.contacts.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
            });
        },
        // trả về các contact có chứa thông tin tìm kiếm

        filteredContacts() {
            if (!this.searchText) return this.contact;
            return this.contacts.filter((_contact, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.fulteredContacts[this.activeIndex];
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },
    method: {
        async retrieveContact() {
            try {
                this.contacts = await ContactService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this, retrieveContact();
            this.activeIndex = -1;

        },
        async removeAllContacts() {
            if (confirm("Bạn muốn xóa tất cả liên hệ?")) {
                try {
                    await ContactService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddContact() {
            this.$refeshList();
        }
    },


    // Đoạn mã xử lí sẽ được trình bày đầy đủ bên dưới
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>
