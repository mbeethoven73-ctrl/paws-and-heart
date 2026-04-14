import { useState, useEffect } from "react";
import { Menu, Search, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getFeaturedPets } from "../services/pets";
import {
	addFavorite,
	removeFavorite,
	getFavoriteIds,
} from "../services/favorites";
import { DEFAULT_AVATAR, PET_CATEGORIES } from "../constants/settings";
import type { Pet } from "../types";

interface HomeProps {
	onNavigate: (screen: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
	const navigate = useNavigate();
	const { user, profile } = useAuth();
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(true);
	const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);
	const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			const pets = await getFeaturedPets();
			setFeaturedPets(pets);

			if (user) {
				const favIds = await getFavoriteIds(user.id);
				setFavoriteIds(favIds);
			}

			setIsLoading(false);
		};
		loadData();
	}, [user]);

	const handleToggleFavorite = async (e: React.MouseEvent, petId: number) => {
		e.stopPropagation();
		if (!user) {
			onNavigate("login");
			return;
		}

		if (favoriteIds.has(petId)) {
			try {
				await removeFavorite(user.id, petId);
				setFavoriteIds((prev) => {
					const next = new Set(prev);
					next.delete(petId);
					return next;
				});
				toast.info("Removed from favorites");
			} catch (err) {
				toast.error("Failed to remove from favorites");
			}
		} else {
			try {
				await addFavorite(user.id, petId);
				setFavoriteIds((prev) => new Set(prev).add(petId));
				toast.success("Added to favorites!");
			} catch (err) {
				toast.error("Failed to add to favorites");
			}
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm flex justify-between items-center px-6 h-16">
				<div className="flex items-center gap-4">
					<button className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-200">
						<Menu className="w-6 h-6" />
					</button>
					<h1 className="text-2xl font-black tracking-tight text-primary font-headline">
						Paws & Hearts
					</h1>
				</div>
				<button
					onClick={() => onNavigate("profile")}
					className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container active:scale-95 duration-200"
				>
					<img alt="User Profile" src={DEFAULT_AVATAR} />
				</button>
			</header>

			<main className="pt-20 pb-28 px-6 max-w-2xl mx-auto w-full">
				<section className="mt-4 mb-8">
					<h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">
						Find your next{" "}
						<span className="text-primary">best friend</span>
					</h2>
					<p className="text-on-surface-variant font-medium mb-6">
						Over 2,400 pets are looking for a forever home today.
					</p>

					<div
						className="relative group"
						onClick={() => onNavigate("search")}
					>
						<div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
							<Search className="w-5 h-5 text-outline" />
						</div>
						<input
							className="w-full py-4 pl-14 pr-6 bg-surface-container-lowest border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline transition-all cursor-pointer"
							placeholder="Search by breed, age, or personality"
							type="text"
							readOnly
						/>
					</div>
				</section>

				<section className="mb-10">
					<div className="flex justify-between items-end mb-4">
						<h3 className="font-headline font-bold text-lg">
							Categories
						</h3>
						<button className="text-primary font-semibold text-sm">
							View All
						</button>
					</div>
					<div
						className="flex gap-4 overflow-x-auto -mx-6 px-6 pb-2"
						style={{ scrollbarWidth: "none" }}
					>
						{PET_CATEGORIES.map((cat) => (
							<div
								key={cat.label}
								className="flex flex-col items-center gap-2 group cursor-pointer shrink-0"
							>
								<div className="w-20 h-20 rounded-xl bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container transition-colors duration-300">
									<span className="text-4xl">{cat.icon}</span>
								</div>
								<span className="font-label font-bold text-xs uppercase tracking-wider text-on-surface-variant group-hover:text-primary transition-colors">
									{cat.label}
								</span>
							</div>
						))}
					</div>
				</section>

				<section className="mb-8">
					<div className="flex justify-between items-end mb-6">
						<h3 className="font-headline font-bold text-2xl tracking-tight">
							Featured Pets
						</h3>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{isLoading ? (
							<>
								<div className="col-span-2 rounded-xl bg-surface-container-high h-80 animate-pulse border border-outline-variant/20"></div>
								<div className="rounded-xl bg-surface-container-high h-64 animate-pulse border border-outline-variant/20"></div>
								<div className="rounded-xl bg-surface-container-high h-64 animate-pulse border border-outline-variant/20"></div>
							</>
						) : (
							<>
								{featuredPets.map((pet, index) => (
									<div
										key={pet.id}
										onClick={() =>
											navigate(`/${pet.id}/petDetails`)
										}
										className={`${index === 0 ? "col-span-2 h-80" : "h-64"} relative group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low`}
									>
										<img
											alt={pet.name}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
											src={pet.image_url}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent"></div>
										<button
											onClick={(e) =>
												handleToggleFavorite(e, pet.id)
											}
											className={`absolute rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
												index === 0
													? "top-6 right-6 w-12 h-12"
													: "top-4 right-4 w-10 h-10"
											} ${
												favoriteIds.has(pet.id)
													? "bg-error/80 text-white"
													: "bg-black/20 text-white hover:bg-white hover:text-error"
											}`}
										>
											<Heart
												className={
													index === 0
														? "w-6 h-6"
														: "w-5 h-5"
												}
												fill={
													favoriteIds.has(pet.id)
														? "currentColor"
														: "none"
												}
											/>
										</button>

										<div
											className={`absolute left-0 right-0 bottom-0 p-6 ${index === 0 ? "md:p-8" : "md:p-6"}`}
										>
											{index === 0 && (
												<div className="flex gap-2 mb-3">
													<span className="px-3 py-1 rounded-full bg-[#FFB37C] text-[#4A2C15] text-[10px] font-black uppercase tracking-widest">
														Match of the day
													</span>
												</div>
											)}
											<h4
												className={`text-white font-headline font-black leading-tight ${index === 0 ? "text-4xl" : "text-2xl"}`}
											>
												{pet.name}
											</h4>
											<p
												className={`text-white/90 font-medium mt-1 ${index === 0 ? "text-lg" : "text-sm"}`}
											>
												{pet.breed} • {pet.age}
											</p>
										</div>
									</div>
								))}
							</>
						)}
					</div>
				</section>

				<section className="bg-primary-container rounded-xl p-8 text-on-primary-container relative overflow-hidden">
					<div className="relative z-10">
						<h3 className="font-headline text-2xl font-bold mb-2">
							Join our Pet Community
						</h3>
						<p className="mb-6 opacity-90 text-sm leading-relaxed max-w-[80%]">
							Get weekly updates on new arrivals and adoption
							success stories from around your city.
						</p>
						<button className="bg-surface-container-lowest text-primary px-6 py-3 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform">
							Sign Me Up
						</button>
					</div>
					<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
				</section>
			</main>
		</div>
	);
}
