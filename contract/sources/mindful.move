module module_add::mindful{

    // Import libraries
    use std::error;
    use std::signer;
    use std::string;
    use std::string::{String};
    use std::vector;
    use aptos_framework::event;
    use aptos_framework::timestamp;

    // Error handling
    const ENOT_OWNER: u64 = 1;
    const EINVALID_MEETING_TYPE: u64 = 2;
    const EINVALID_PAGE: u64 = 3;
    const MAX_MESSAGES: u64 = 100;
    const MAX_THERAPISTS: u64 = 50;
    const ITEMS_PER_PAGE: u64 = 10;

    // Resources
    struct Mindful has key {
        messages: vector<Message>,
        therapists: vector<Therapist>,
        meeting_links: AnonMeetings,
        message_events: event::EventHandle<AddedMessage>,
        therapist_events: event::EventHandle<AddedTherapist>,
        link_events: event::EventHandle<LinkUpdatedEvent>,
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

    #[event]
    struct AddedMessage has drop, store {
        sender: address,
        message: String,
        added_at: u64
    }

    #[event]
    struct AddedTherapist has drop, store {
        name: String,
        area_of_work: String,
        photo: String,
        number: u64
    }

    #[event]
    struct LinkUpdatedEvent has drop, store {
        meeting_type: String,
        new_link: String,
    }

    fun init_module(owner: &signer) {
        move_to(owner, Mindful {
            messages: vector[],
            therapists: vector[],
            meeting_links: AnonMeetings {
                alcohol_anon: std::string::utf8(b"https://meet.google.com/upc-zgos-zsg"),
                gambler_anon: std::string::utf8(b"https://meet.google.com/upc-zgos-zsg"),
            },
            message_events: event::new_event_handle<AddedMessage>(owner),
            therapist_events: event::new_event_handle<AddedTherapist>(owner),
            link_events: event::new_event_handle<LinkUpdatedEvent>(owner),
        })
    }

    /// Entry functions
    // This function is for every user to add their thoughts
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

        event::emit_event(&mut posts.message_events, AddedMessage {
            sender: new_message.sender,
            message: new_message.message,
            added_at: new_message.added_at
        });
    }

    // This is only entered by the deployer to add to the list of therapists
    public entry fun add_therapist(owner: &signer, name: String, area_of_work: String, photo: String, number: u64) acquires Mindful {
        only_owner(owner);
        let therapist = borrow_global_mut<Mindful>(@module_add);
        let new_therapist = Therapist {
            name,
            area_of_work,
            photo,
            number
        };

        if (vector::length(&therapist.therapists) >= MAX_THERAPISTS) {
            vector::remove(&mut therapist.therapists, 0);
        };
        vector::push_back(&mut therapist.therapists, new_therapist);

        event::emit_event(&mut therapist.therapist_events, AddedTherapist {
            name: new_therapist.name,
            area_of_work: new_therapist.area_of_work,
            photo: new_therapist.photo,
            number: new_therapist.number
        });
    }

    // Only entered by the deployer to change the meeting links if needed.
    // Later changes will be done to integrate jisti's open source video conferencing
    public entry fun update_meeting_link(owner: &signer, meeting_type: String, new_link: String) acquires Mindful {
        only_owner(owner);
        let meetings = borrow_global_mut<Mindful>(@module_add);
        if (meeting_type == std::string::utf8(b"Alcoholic Anon")) {
            meetings.meeting_links.alcohol_anon = new_link;
        } else if (meeting_type == std::string::utf8(b"Gamblers Anon")) {
            meetings.meeting_links.gambler_anon = new_link;
        } else {
            abort error::invalid_argument(EINVALID_MEETING_TYPE)
        };

        event::emit_event(&mut meetings.link_events, LinkUpdatedEvent {
            meeting_type,
            new_link,
        });
    }

    public entry fun clear_messages(owner: &signer) acquires Mindful {
        only_owner(owner);
        let posts = borrow_global_mut<Mindful>(@module_add);
        posts.messages = vector[];
    }

    inline fun only_owner(owner: &signer) {
        assert!(signer::address_of(owner) == @billboard_address, error::permission_denied(ENOT_OWNER));
    }
}