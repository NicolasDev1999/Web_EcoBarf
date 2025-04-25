import Image from "next/image";

const StaticImage = () => {
  return (
    <div className="relative lg-hidden hidden lg:block">
      <div className="staticImage absolute">
        <Image
          src="/imagenes/gurmet_img_ecobarf.png"
          alt="Imagen estática con sombra"
          width={520}
          height={600}
        />
      </div>
    </div>
  );
};

export default StaticImage;
