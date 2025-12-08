class SoundManager {
    static pepe_hurt_sound = new Audio("audio/pepe_hurt_and_dead/ough_cut.mp3");
    static pepe_dead_sound = new Audio("audio/pepe_hurt_and_dead/pepe_dies_cut.mp3");
    static pepe_jump_sound = new Audio("audio/jump_sound/jump_sound_cut.mp3");
    static pepe_snore_sound = new Audio("audio/pepe_snoring/snore-new.mp3")

    static chicken_dead_sound = new Audio("audio/chicken_dead/splash-cut.mp3");

    static endboss_hurt_sound = new Audio("audio/chicken_and_small_chicken_walking/chicken-430403.mp3");
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

    static muted = false;

    static init() {
        this.background_music.volume = 0.1;
        this.background_sound.volume = 0.2;

        this.collect_coin_sound.volume = 0.1;
        this.collect_bottle_sound.volume = 0.1;
        this.pepe_jump_sound.volume = 0.2;

        this.bottle_smash_sound.volume = 0.2;
        this.chicken_dead_sound.volume = 0.2;

        this.pepe_hurt_sound.volume = 0.2;
        this.pepe_dead_sound.volume = 0.2;
        this.pepe_snore_sound.volume = 0.3;
        this.pepe_snore_sound.loop = true;

        this.endboss_hurt_sound.volume = 0.4;
        this.endboss_dead_sound.volume = 0.4;
        this.endboss_alert_sound.volume = 0.4;

        this.win_music.volume = 0.3;
        this.win_sound.volume = 0.3;
        this.lost_sound.volume = 0.3;
        this.lost_sound.volume = 0.3;

        let savedMute = localStorage.getItem("muteStatus");
        if (savedMute === "true") {
            this.muted = true;
            this.background_music.pause();
            this.background_sound.pause();
        } else {
            this.muted = false;
        }
        this.background_music.volume = 0.2;
        this.background_sound.volume = 0.2;
    }

    static toggleMute() {
        this.muted = !this.muted;

        localStorage.setItem("muteStatus", String(this.muted));
        if (this.muted) {
            this.background_music.pause();
            this.background_sound.pause();
        } else {
            this.background_music.play();
            this.background_sound.play();
        }
    }

    static playSound(audio) {
        if (this.muted) {
            return;
        }
        let clone = audio.cloneNode(true);
        clone.volume = audio.volume;
        clone.play();
    }
}

