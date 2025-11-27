class SoundManager {
    static pepe_hurt_sound = new Audio("audio/pepe_hurt_and_dead/ough_cut.mp3");
    static pepe_dead_sound = new Audio("audio/pepe_hurt_and_dead/pepe_dies_cut.mp3");
    static pepe_jump_sound = new Audio("audio/jump_sound/jump_sound_cut.mp3");

    static chicken_dead_sound = new Audio("audio/chicken_dead/chicken_dead.ogg");
    static chicken_walking_sound = new Audio("audio/chicken_and_small_chicken_walking/chicken-noise-cut.mp3");
    static small_chicken_walking_sound = new Audio("audio/chicken_and_small_chicken_walking/short-chick-sound-171389.mp3");

    static endboss_hurt_sound = new Audio("audio/endboss_hurt_and_dead/glass_bottle_breaking_cut.mp3");
    static endboss_dead_sound = new Audio("audio/endboss_hurt_and_dead/roaster-crows-2-363352.mp3");
    static endboss_alert_sound = new Audio("audio/alert/alert_new_cut.mp3");

    static collect_coin_sound = new Audio("audio/coins/get_coin_cut.mp3");
    static collect_bottle_sound = new Audio("audio/bottle/bottle_clink_cut.mp3");
    static bottle_smash_sound = new Audio("audio/bottle/bottle-break-39916.mp3");

    static background_music = new Audio("audio/background_music_and_sound/flamenco-loop-1-382455.mp3");
    static background_sound = new Audio("audio/background_music_and_sound/desert-binaural-wind-5976.mp3");

    static win_music = new Audio("audio/winner_sound/goodresult_cut.mp3");
    static win_sound = new Audio("audio/winner_sound/whoppii_new_cut.mp3");
    static lost_music = new Audio("audio/lost_sound/game_over_sound.mp3");
    static lost_sound = new Audio("audio/lost_sound/game_over_cut.mp3");

    static init() {
        this.background_music.volume = 0.1;
        this.background_sound.volume = 0.2;

        this.collect_coin_sound.volume = 0.1;
        this.collect_bottle_sound.volume = 0.1;

        this.pepe_jump_sound.volume = 0.2;
        this.bottle_smash_sound.volume = 0.3;
    }

    static mute(muted) {
        if (muted) {
            this.background_music.pause();
        } else {
            this.background_music.play();
        }
    }

    static playSound(audio) {
        let clone = audio.cloneNode(true);
        clone.volume = audio.volume;
        clone.play();
    }
}

