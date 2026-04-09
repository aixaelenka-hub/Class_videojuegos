//butones de lenguajes

    function ale () {
        title2 =document.getElementById ("title2");
        subtitle1 =document.getElementById ("subtitle1");
        subtitle2 =document.getElementById ("subtitle2");

         parrafo1 =document.getElementById ("parrafo1");
         parrafo2 =document.getElementById ("parrafo2");
         links = document.getElementById ("links");
         title = document.getElementById ("title");

        parrafo1.innerHTML = "Die Hauskatze stammt von Populationen der Afrikanischen Wildkatze (Felis lybica lybica) im Nahen Osten und in Ägypten ab. Die Familie der Katzen (Felidae), zu der alle modernen Katzenarten gehören, entstand vermutlich vor 12 bis 13 Millionen Jahren und ist in acht Hauptlinien unterteilt. Die Hauskatze gehört insbesondere zur Linie Felis. Verschiedene Studien haben gezeigt, dass alle Hauskatzenrassen von einer einzigen Art innerhalb der Felis-Linie, Felis catus, abstammen. Variationen dieser Linie finden sich weltweit, und bis vor Kurzem fiel es Wissenschaftlern schwer, die genaue Ursprungsregion der modernen Hauskatze zu bestimmen. Man geht davon aus, dass viele isolierte Ereignisse an verschiedenen Orten zur Entwicklung dieser Rassen führten. Die Situation wurde zusätzlich dadurch verkompliziert, dass Wildkatzenpopulationen weit verbreitet und einander sehr ähnlich sind. Diese Wildkatzenvarianten paaren sich bei engem Kontakt ungehindert, was die Grenzen zwischen den Taxa weiter verwischt. Jüngste DNA-Studien, Fortschritte in der Gentechnik und ein besseres Verständnis von DNA und Genetik insgesamt haben zur Erforschung der Evolutionsgeschichte der Hauskatze beigetragen. Archäologische Funde belegen ein früheres Domestizierungsdatum als bisher angenommen."
        parrafo2.innerHTML = "Ein Katzencafé ist ein Themencafé, dessen Attraktion Katzen sind, die man beobachten und mit denen man spielen kann. Die Gäste zahlen einen Eintrittspreis, in der Regel stundenweise, und daher können Katzencafés als eine Form der beaufsichtigten Haustiervermietung in Innenräumen betrachtet werden."
        links.innerHTML = "-Lieblingslinks-" 
        title.innerHTML = "☕KATZENCAFE☕"
        title2.innerHTML = "(empfehlungen)"
        subtitle1.innerHTML = "-WAS SIND KATZENCAFÉS?-"
        subtitle2.innerHTML = "-WIE WURDEN KATZEN DOMESSTIZIERT-"
    }
    function esp() {
        title2 =document.getElementById ("title2");
        subtitle1 =document.getElementById ("subtitle1");
        subtitle2 =document.getElementById ("subtitle2");
        parrafo1 =document.getElementById ("parrafo1");
        parrafo2 =document.getElementById ("parrafo2");
        links = document.getElementById ("links");
        title = document.getElementById ("title");

        parrafo1.innerHTML = "El gato doméstico se originó a partir de poblaciones del Cercano Oriente y Egipto del gato montés africano, Felis lybica lybica. Se cree que la familia Felidae, a la que pertenecen todas las especies de felinos actuales, surgió hace entre 12 y 13 millones de años y se divide en ocho linajes filogenéticos principales. El linaje Felis, en particular, es al que pertenece el gato doméstico. Diversas investigaciones han demostrado que todas las variedades domésticas de gatos provienen de una sola especie del linaje Felis, Felis catus. Se encuentran variaciones de este linaje en todo el mundo y, hasta hace poco, a los científicos les resultaba difícil identificar con exactitud la región que dio origen al gato doméstico moderno. Se cree que muchos eventos aislados en diferentes lugares dieron lugar a la creación de estas razas. La situación se complicó aún más debido a que las poblaciones de gatos monteses están muy extendidas y son muy similares entre sí. Estas variaciones de gatos monteses se cruzan libremente entre sí cuando están en contacto cercano, lo que difumina aún más los límites entre los taxones. Estudios recientes de ADN, avances en tecnologías genéticas y una mejor comprensión del ADN y la genética en su conjunto han contribuido a la historia evolutiva del gato doméstico. La evidencia arqueológica ha proporcionado fechas de domesticación más tempranas de lo que se había sugerido anteriormente."
        parrafo2.innerHTML = "Un café de gatos es un café temático cuyo principal atractivo son los gatos, con los que se puede jugar y observar. Los clientes pagan una entrada, generalmente por hora, por lo que los cafés de gatos pueden considerarse una forma de alquiler de mascotas en interiores bajo supervisión."
        links.innerHTML = "-Enlaces Favoritos-"
        title.innerHTML = "☕Cafe de Gatos☕"

        title2.innerHTML = "(recomendaciones)"
        subtitle1.innerHTML = "-¿QUÉ SON LOS CAFÉS DE GATOS?-"
        subtitle2.innerHTML = "-¿CÓMO SE DOMESTICARON LOS GATOS?-"
    }
    function ingles () {
        title2 =document.getElementById ("title2");
        subtitle1 =document.getElementById ("subtitle1");
        subtitle2 =document.getElementById ("subtitle2");
        parrafo1 =document.getElementById ("parrafo1");
        parrafo2 =document.getElementById ("parrafo2");
        links = document.getElementById ("links");
        title = document.getElementById ("title");

        parrafo1.innerHTML = "The domestic cat originated from Near-Eastern and Egyptian populations of the African wildcat, Felis lybica lybica. The family Felidae, to which all living feline species belong, is thought to have arisen about 12 to 13 million years ago and is divided into eight major phylogenetic lineages. The Felis lineage in particular is the lineage to which the domestic cat belongs. Several investigations have shown that all domestic varieties of cats come from a single species of the Felis lineage, Felis catus. Variations of this lineage are found across the world, and until recently, scientists have found it difficult to identify exactly which region gave rise to the modern domestic cat. It is believed that many separate incidents in different places led to the creation of these breeds. More complications arose from the fact that wildcat populations are very widespread and are very similar to one another. These variations of wildcats interbreed freely with one another when in close contact, further blurring the lines between taxa. Recent DNA studies, advancement in genetic technologies, and a better understanding of DNA and genetics as a whole, have added to the evolutionary history of the domestic cat. Archaeological evidence has provided earlier dates for domestication than were previously suggested"
        parrafo2.innerHTML = "A cat cafe is a theme cafe whose attraction is cats who can be watched and played with. Patrons pay a cover fee, generally hourly, and thus cat cafes can be seen as a form of supervised indoor pet rental."
        links.innerHTML = "-Favorite Links-"
        title.innerHTML = "☕CAT CAFE☕"


        title2.innerHTML = "(recomendations)"
        subtitle1.innerHTML = "-WHAT ARE CAT CAFE'S?-"
        subtitle2.innerHTML = "-HOW WERE CATS DOMESTICATED-"
    }
    let n = "";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('button[onclick="time()"]');

    container.addEventListener("click", () => {
        startTime();

        setTimeout(() => {
            container.innerHTML = n;
        }, 10);
    });
});

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    n = h + ":" + m + ":" + s;

    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i; }
    return i;
}

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.createElement("audio");
    audio.src = "sonido.mp3";
    audio.controls = true;
    audio.autoplay = true;

    document.body.appendChild(audio);
});