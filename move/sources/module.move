module module_add::mindful {
    use std::error;
    use std::signer;
    use std::string::{Self, String};
    use std::vector;
    use aptos_framework::timestamp;

    /// Error handling
    const ENOT_OWNER: u64 = 1;
    const EINVALID_MEETING_TYPE: u64 = 2;
    const MAX_MESSAGES: u64 = 100;
    const MAX_THERAPISTS: u64 = 50;

    /// Resources
    struct Mindful has key {
        messages: vector<Message>,
        therapists: vector<Therapist>,
        meeting_links: AnonMeetings,
    }

    struct Message has store, copy, drop {
        sender: address,
        message: String,
        added_at: u64
    }

    struct Therapist has store, copy, drop {
        name: String,
        area_of_work: String,
        photo: String,
        number: u64
    }

    struct AnonMeetings has store, copy, drop {
        alcohol_anon: String,
        gambler_anon: String
    }

    fun init_module(owner: &signer) {
        move_to(owner, Mindful {
            messages: vector::empty(),
            therapists: vector::empty(),
            meeting_links: AnonMeetings {
                alcohol_anon: string::utf8(b"https://meet.google.com/upc-zgos-zsg"),
                gambler_anon: string::utf8(b"https://meet.google.com/dnh-xwfi-zgy"),
            },
        })
    }

    /// Entry Functions

    public entry fun add_message(sender: &signer, message: String) acquires Mindful {
        let sender_address = signer::address_of(sender);
        let posts = borrow_global_mut<Mindful>(@module_add);
        let new_message = Message {
            sender: sender_address,
            message,
            added_at: timestamp::now_seconds()
        };

        if (vector::length(&posts.messages) >= MAX_MESSAGES) {
            vector::remove(&mut posts.messages, 0);
        };
        vector::push_back(&mut posts.messages, new_message);
    }

    public entry fun add_therapist(name: String, area_of_work: String, photo: String, number: u64) acquires Mindful {
        let mindful = borrow_global_mut<Mindful>(@module_add);
        let new_therapist = Therapist {
            name,
            area_of_work,
            photo,
            number
        };

        if (vector::length(&mindful.therapists) >= MAX_THERAPISTS) {
            vector::remove(&mut mindful.therapists, 0);
        };
        vector::push_back(&mut mindful.therapists, new_therapist);
    }

    public entry fun update_meeting_link(owner: &signer, meeting_type: String, new_link: String) acquires Mindful {
        only_owner(owner);
        let mindful = borrow_global_mut<Mindful>(@module_add);
        if (meeting_type == string::utf8(b"Alcoholic Anon")) {
            mindful.meeting_links.alcohol_anon = new_link;
        } else if (meeting_type == string::utf8(b"Gamblers Anon")) {
            mindful.meeting_links.gambler_anon = new_link;
        } else {
            abort error::invalid_argument(EINVALID_MEETING_TYPE)
        };
    }

    public entry fun clear_messages(sender: &signer) acquires Mindful {
        let sender_address = signer::address_of(sender);
        let mindful = borrow_global_mut<Mindful>(@module_add);
        let (i, len) = (0, vector::length(&mindful.messages));
        let temp = vector::empty();

        while (i < len) {
            let message = vector::borrow(&mindful.messages, i);
            if (message.sender != sender_address) {
                vector::push_back(&mut temp, *message);
            };
            i = i + 1;
        };

        mindful.messages = temp;
    }

    inline fun only_owner(owner: &signer) {
        assert!(signer::address_of(owner) == @module_add, error::permission_denied(ENOT_OWNER));
    }

    /// View Functions
    #[view]
    public fun get_messages(): vector<Message> acquires Mindful {
        let mindful = borrow_global<Mindful>(@module_add);
        mindful.messages
    }

    #[view]
    public fun get_therapists(): vector<Therapist> acquires Mindful {
        let mindful = borrow_global<Mindful>(@module_add);
        mindful.therapists
    }

    #[view]
    public fun get_meeting_links(): (String, String) acquires Mindful {
        let mindful = borrow_global<Mindful>(@module_add);
        (mindful.meeting_links.alcohol_anon, mindful.meeting_links.gambler_anon)
    }

    #[view]
    public fun get_message_count(): u64 acquires Mindful {
        let mindful = borrow_global<Mindful>(@module_add);
        vector::length(&mindful.messages)
    }

    #[view]
    public fun get_therapist_count(): u64 acquires Mindful {
        let mindful = borrow_global<Mindful>(@module_add);
        vector::length(&mindful.therapists)
    }
}