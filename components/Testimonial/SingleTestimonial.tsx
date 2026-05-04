type TestimonialRow = {
  id: string;
  name: string;
  designation: string | null;
  image: string | null;
  content: string;
};

const SingleTestimonial = ({ review }: { review: TestimonialRow }) => {
  const { name, designation, image, content } = review;
  return (
    <div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
            {name}
          </h3>
          {designation && <p>{designation}</p>}
        </div>
        {image && (
          <img
            src={image}
            alt={name}
            width={60}
            height={50}
            className="h-[50px] w-[60px] rounded-full object-cover"
          />
        )}
      </div>
      <p>{content}</p>
    </div>
  );
};

export default SingleTestimonial;
